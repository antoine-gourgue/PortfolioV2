import nodemailer from 'nodemailer'
import { mailConfig } from '~/config/mailConfig'

export const sendContactEmail = async (
  name: string,
  email: string,
  message: string
) => {
  const transporter = nodemailer.createTransport({
    host: mailConfig.host,
    port: mailConfig.port,
    secure: mailConfig.secure,
    auth: {
      user: mailConfig.auth.user,
      pass: mailConfig.auth.pass,
    },
  })

  const mailOptions = {
    from: `"${name}" <${email}>`,
    to: mailConfig.to,
    subject: `New message from ${name}`,
    text: `
Name: ${name}
Email: ${email}
Message:
${message}
    `,
  }

  return await transporter.sendMail(mailOptions)
}
