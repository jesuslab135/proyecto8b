import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: 'tu_correo@gmail.com',
    pass: 'tu_contraseña_de_aplicacion',
  },
});

export async function sendTokenEmail(email: string, token: string) {
  const info = await transporter.sendMail({
    from: '"Registro Universitario" <tu_correo@gmail.com>',
    to: email,
    subject: 'Tu token de acceso',
    text: `Tu token de acceso es: ${token}`,
    html: `<p>Tu token de acceso es: <b>${token}</b></p>`,
  });

  return info.messageId;
}
