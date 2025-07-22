import nodemailer from 'nodemailer';

// Configura aquí los datos SMTP reales
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com', // Cambia esto si usas otro proveedor
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,     // ejemplo: correo@gmail.com
    pass: process.env.SMTP_PASS      // ejemplo: contraseña de app (no tu contraseña personal)
  }
});

/**
 * Envía un token único por correo al usuario
 */
export async function sendTokenEmail(destinatario: string, token: string) {
  const mailOptions = {
    from: '"UniON Soporte" <no-reply@union.com>',
    to: destinatario,
    subject: 'Tu token de acceso a UniON',
    html: `
      <h3>¡Bienvenido a UniON!</h3>
      <p>Tu token de acceso es:</p>
      <p style="font-size: 20px; font-weight: bold;">${token}</p>
      <p>Úsalo para completar tu registro en la plataforma.</p>
    `
  };

  try {
    const result = await transporter.sendMail(mailOptions);
    console.log(`Correo enviado a ${destinatario}`, result.messageId);
  } catch (error) {
    console.error(`Error al enviar correo a ${destinatario}`, error);
    throw error;
  }
}
