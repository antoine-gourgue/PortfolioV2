import { defineEventHandler, readBody, getRequestIP, createError } from 'h3'

// Petit rate limiting en mémoire (par IP)
const requests = new Map<string, { count: number; windowStart: number }>()
const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS = 5

interface ContactPayload {
  name: string
  email: string
  message: string
  honeypot?: string
}

// échappement basique pour éviter d'injecter du HTML brut dans l'email
const escapeHtml = (str: string): string =>
  str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')

const validatePayload = (body: Partial<ContactPayload>): ContactPayload => {
  if (!body || typeof body !== 'object') {
    throw createError({ statusCode: 400, statusMessage: 'Invalid payload' })
  }

  const { name, email, message, honeypot } = body as ContactPayload

  if (
    typeof name !== 'string' ||
    typeof email !== 'string' ||
    typeof message !== 'string'
  ) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid data types' })
  }

  const trimmedName = name.trim()
  const trimmedEmail = email.trim()
  const trimmedMessage = message.trim()

  if (!trimmedName || !trimmedEmail || !trimmedMessage) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Missing required fields',
    })
  }

  if (trimmedName.length < 2 || trimmedName.length > 100) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid name length' })
  }

  if (trimmedMessage.length < 5 || trimmedMessage.length > 2000) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid message length',
    })
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(trimmedEmail)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid email address',
    })
  }

  return {
    name: trimmedName,
    email: trimmedEmail,
    message: trimmedMessage,
    honeypot,
  }
}

const generateEmailTemplate = (
  name: string,
  email: string,
  message: string
) => {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  const safeMessage = escapeHtml(message).replace(/\r?\n/g, '<br />')

  return `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>New Message</title>
    <style>
      body {
        background-color: #f8f8f8;
        font-family: Arial, sans-serif;
        padding: 20px;
        margin: 0;
      }
      .container {
        max-width: 600px;
        margin: auto;
        background: #fff;
        border-radius: 10px;
        padding: 30px;
        box-shadow: 0 0 15px rgba(0,0,0,0.05);
      }
      .logo {
        text-align: center;
        margin-bottom: 30px;
      }
      .logo img {
        max-width: 120px;
      }
      h2 {
        text-align: center;
        color: #333;
        margin-bottom: 20px;
      }
      .content p {
        color: #555;
        line-height: 1.6;
        margin: 10px 0;
      }
      .footer {
        margin-top: 30px;
        text-align: center;
        font-size: 12px;
        color: #aaa;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="logo">
        <img src="https://antoinegourgue.dev/assets/antoinegourgue-logo.svg" alt="Logo" />
      </div>
      <h2>New Message Received</h2>
      <div class="content">
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
      </div>
      <div class="footer">
        This message was sent from your portfolio contact form.
      </div>
    </div>
  </body>
  </html>
`
}

export default defineEventHandler(async (event) => {
  // Rate limiting très simple en mémoire
  const ip = getRequestIP(event) || 'unknown'
  const now = Date.now()
  const current = requests.get(ip)

  if (!current || now - current.windowStart > WINDOW_MS) {
    // nouvelle fenêtre
    requests.set(ip, { count: 1, windowStart: now })
  } else {
    if (current.count >= MAX_REQUESTS) {
      throw createError({
        statusCode: 429,
        statusMessage: 'Too many requests. Please try again later.',
      })
    }
    current.count++
  }

  const body = await readBody<Partial<ContactPayload>>(event)
  const { name, email, message, honeypot } = validatePayload(body)

  // Honeypot rempli => probablement un bot → on fait comme si tout allait bien
  if (honeypot && honeypot.trim().length > 0) {
    return { success: true }
  }

  if (
    !process.env.MAIL_HOST ||
    !process.env.MAIL_PORT ||
    !process.env.MAIL_USER ||
    !process.env.MAIL_PASS ||
    !process.env.MAIL_TO
  ) {
    // eslint-disable-next-line no-console
    console.error('Missing mail environment variables')
    throw createError({
      statusCode: 500,
      statusMessage: 'Mail configuration error',
    })
  }

  const nodemailer = await import('nodemailer')

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT, 10),
    secure: process.env.MAIL_SECURE !== 'false', // par défaut true (465)
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })

  const htmlContent = generateEmailTemplate(name, email, message)

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO,
    replyTo: `${name} <${email}>`,
    subject: `New message from ${name}`,
    html: htmlContent,
  })

  return { success: true }
})
