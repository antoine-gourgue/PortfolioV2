export const mailConfig = {
  host: process.env.MAIL_HOST || '',
  port: parseInt(process.env.MAIL_PORT || '465', 10),
  secure: true,
  auth: {
    user: process.env.MAIL_USER || '',
    pass: process.env.MAIL_PASS || '',
  },
  from: process.env.MAIL_FROM || '',
  to: process.env.MAIL_TO || '',
}
