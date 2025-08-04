import nodemailer from 'nodemailer';

export async function sendContactEmail(to: string, subject: string, html: string) {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"UniON Contacto" <${process.env.MAIL_USER}>`,
    to,
    subject,
    html,
  });
}