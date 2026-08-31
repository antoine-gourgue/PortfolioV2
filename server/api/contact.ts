import { defineEventHandler, readBody, getRequestIP, createError } from 'h3'

// Small in-memory per-IP rate limiter
const requests = new Map<string, { count: number; windowStart: number }>()
const WINDOW_MS = 10 * 60 * 1000 // 10 minutes
const MAX_REQUESTS = 5

interface ContactAttachment {
  name: string
  type: string
  data: string // base64
}

interface ContactPayload {
  name: string
  email: string
  message: string
  messageHtml?: string
  honeypot?: string
  attachment?: ContactAttachment
}

// Rich-editor HTML: formatting tags only, all attributes stripped
const ALLOWED_HTML_TAGS = 'b|strong|i|em|u|s|strike|del|ul|ol|li|br|div|p|span'
const sanitizeMessageHtml = (html: unknown): string | undefined => {
  if (html === undefined || html === null) return undefined
  if (typeof html !== 'string' || html.length > 20000) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Invalid message html',
    })
  }
  return html
    .replace(
      new RegExp(`<(?!\\/?(?:${ALLOWED_HTML_TAGS})(?=[\\s>/]))[^>]*>`, 'gi'),
      ''
    )
    .replace(new RegExp(`<(\\/?)(${ALLOWED_HTML_TAGS})[^>]*>`, 'gi'), '<$1$2>')
}

// ~3MB once decoded (base64 ≈ +33%), under Vercel's body limit
const MAX_ATTACHMENT_BASE64 = 4_200_000
const ALLOWED_ATTACHMENT_TYPES = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'text/plain',
  'image/png',
  'image/jpeg',
]

const validateAttachment = (
  attachment: unknown
): ContactAttachment | undefined => {
  if (attachment === undefined || attachment === null) return undefined
  const { name, type, data } = attachment as Partial<ContactAttachment>
  if (
    typeof name !== 'string' ||
    typeof type !== 'string' ||
    typeof data !== 'string'
  ) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid attachment' })
  }
  // path-free file name, bounded length
  const safeName = name.replace(/[/\\]/g, '').slice(0, 150).trim()
  if (!safeName || !ALLOWED_ATTACHMENT_TYPES.includes(type)) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Unsupported attachment type',
    })
  }
  if (
    data.length > MAX_ATTACHMENT_BASE64 ||
    !/^[A-Za-z0-9+/]+={0,2}$/.test(data)
  ) {
    throw createError({
      statusCode: 400,
      statusMessage: 'Attachment too large',
    })
  }
  return { name: safeName, type, data }
}

// basic escaping so raw HTML never reaches the email
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
    messageHtml: sanitizeMessageHtml((body as ContactPayload).messageHtml),
    honeypot,
    attachment: validateAttachment((body as ContactPayload).attachment),
  }
}

const C = {
  bg: '#0d1117',
  card: '#161b22',
  bar: '#21262d',
  border: '#30363d',
  text: '#c9d1d9',
  bright: '#e6edf3',
  dim: '#8b949e',
  blue: '#58a6ff',
  green: '#3fb950',
  purple: '#d2a8ff',
  amber: '#d29922',
}

const generateEmailTemplate = (
  name: string,
  email: string,
  message: string,
  messageHtml: string | undefined,
  attachment?: ContactAttachment
) => {
  const safeName = escapeHtml(name)
  const safeEmail = escapeHtml(email)
  // Editor HTML is already sanitized upstream (formatting tags only);
  // otherwise convert the plain text
  const safeMessage =
    messageHtml || escapeHtml(message).replace(/\r?\n/g, '<br />')
  const received = new Intl.DateTimeFormat('fr-FR', {
    dateStyle: 'long',
    timeStyle: 'short',
    timeZone: 'Europe/Paris',
  }).format(new Date())

  const row = (label: string, value: string) =>
    `<span style="color:${C.blue}">${label.padEnd(6, ' ').replace(/ /g, '&nbsp;')}</span>${value}`

  const attachmentBlock = attachment
    ? `<tr><td style="padding:4px 24px 0;font:400 13px/1.9 Menlo,Consolas,monospace">
         ${row('FILE', `<span style="color:${C.amber}">${escapeHtml(attachment.name)}</span>`)}
       </td></tr>`
    : ''

  return `<!DOCTYPE html>
<html lang="fr"><head><meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Message depuis antoinegourgue.dev</title></head>
<body style="margin:0;padding:28px 16px;background:${C.bg};font-family:Menlo,Consolas,monospace">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center">
<table role="presentation" width="580" cellpadding="0" cellspacing="0" border="0" style="width:580px;max-width:100%;background:${C.card};border:1px solid ${C.border};border-radius:10px;overflow:hidden">

  <tr><td style="background:${C.bar};padding:10px 14px;border-bottom:1px solid ${C.border};font:600 12px/1.4 Menlo,Consolas,monospace;color:${C.dim}">
    antoine@portfolio — nouveau message
  </td></tr>

  <tr><td style="padding:22px 24px 6px;font:400 13px/1.9 Menlo,Consolas,monospace;color:${C.text}">
    <span style="color:${C.green}">$</span> cat contact/message.txt<br /><br />
    ${row('FROM', `<span style="color:${C.bright}">${safeName}</span>`)}<br />
    ${row('EMAIL', `<a href="mailto:${safeEmail}" style="color:${C.purple};text-decoration:none">${safeEmail}</a>`)}<br />
    ${row('DATE', `<span style="color:${C.dim}">${received}</span>`)}
  </td></tr>
  ${attachmentBlock}

  <tr><td style="padding:14px 24px 0"><div style="height:1px;background:${C.border};font-size:0;line-height:0">&nbsp;</div></td></tr>

  <tr><td style="padding:18px 24px 6px;font:400 14px/1.75 -apple-system,'Helvetica Neue',Arial,sans-serif;color:${C.text}">
    ${safeMessage}
  </td></tr>

  <tr><td style="padding:20px 24px 26px;font:400 13px/1.9 Menlo,Consolas,monospace">
    <span style="color:${C.green}">$</span>
    <a href="mailto:${safeEmail}?subject=Re%3A%20votre%20message%20sur%20antoinegourgue.dev" style="color:${C.blue};text-decoration:none">reply --to ${safeEmail}</a>
    <span style="color:${C.text}">&#9613;</span>
  </td></tr>

</table></td></tr></table></body></html>`
}

// Plain-text version: improves deliverability and serves as fallback
const generatePlainText = (
  name: string,
  email: string,
  message: string,
  attachment?: ContactAttachment
) =>
  [
    '$ cat contact/message.txt',
    '',
    `FROM   ${name}`,
    `EMAIL  ${email}`,
    attachment ? `FILE   ${attachment.name}` : '',
    '',
    message,
    '',
    `$ reply --to ${email}`,
  ]
    .filter((l) => l !== '')
    .join('\n')

export default defineEventHandler(async (event) => {
  const ip = getRequestIP(event) || 'unknown'
  const now = Date.now()
  const current = requests.get(ip)

  if (!current || now - current.windowStart > WINDOW_MS) {
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
  const { name, email, message, messageHtml, honeypot, attachment } =
    validatePayload(body)

  // Filled honeypot means a bot: pretend everything went fine
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
    secure: process.env.MAIL_SECURE !== 'false', // defaults to true (port 465)
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })

  const htmlContent = generateEmailTemplate(
    name,
    email,
    message,
    messageHtml,
    attachment
  )
  const textContent = generatePlainText(name, email, message, attachment)

  await transporter.sendMail({
    from: `"Portfolio Contact" <${process.env.MAIL_USER}>`,
    to: process.env.MAIL_TO,
    replyTo: `${name} <${email}>`,
    subject: `Portfolio — message de ${name}`,
    text: textContent,
    html: htmlContent,
    attachments: attachment
      ? [
          {
            filename: attachment.name,
            content: attachment.data,
            encoding: 'base64',
            contentType: attachment.type,
          },
        ]
      : undefined,
  })

  return { success: true }
})
