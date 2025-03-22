import { defineEventHandler, readBody } from 'h3'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const nodemailer = await import('nodemailer')

  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: parseInt(process.env.MAIL_PORT || '465'),
    secure: true,
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  })

  const generateEmailTemplate = (
    name: string,
    email: string,
    message: string
  ) => `
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
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      </div>
      <div class="footer">
        This message was sent from your portfolio contact form.
      </div>
    </div>
  </body>
  </html>
`

  const htmlContent = generateEmailTemplate(body.name, body.email, body.message)

  await transporter.sendMail({
    from: `"${body.name}" <${body.email}>`,
    to: process.env.MAIL_TO,
    subject: `New message from ${body.name}`,
    html: htmlContent,
  })

  return { success: true }
})
