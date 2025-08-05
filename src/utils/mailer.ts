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

export async function enviarTokenPorCorreo(destinatario: string, token: string) {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: false, // true si usas puerto 465
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: `"UniON Plataforma" <${process.env.SMTP_USER}>`,
    to: destinatario,
    subject: 'Tu token de acceso',
    text: `Hola 👋, tu token de acceso es: ${token}`,
  });

  console.log(`✉️ Correo enviado a ${destinatario}`);
}
