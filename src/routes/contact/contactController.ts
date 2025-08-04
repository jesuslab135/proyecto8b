import { Request, Response, NextFunction } from 'express';
import nodemailer from 'nodemailer';

export async function handleContactForm(req: Request, res: Response, next: NextFunction) {
  try {
    const { nombre, correo, rol, universidad, region } = req.body;

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
      }
    });

    const message = `
      Nuevo formulario de contacto enviado desde UniON:
      📌 Nombre: ${nombre}
      📧 Correo: ${correo}
      🧩 Rol solicitado: ${rol}
      🏛️ Universidad: ${rol === 'admin_uni' ? universidad : 'N/A'}
      🌎 Región: ${rol === 'promotor' ? region : 'N/A'}
    `;

    await transporter.sendMail({
      from: `"Formulario UniON" <${process.env.MAIL_USER}>`,
      to: process.env.MAIL_USER,
      subject: `Nueva solicitud: ${rol === 'admin_uni' ? 'Administrador Universitario' : 'Promotor'}`,
      text: message,
    });

    res.status(200).json({ message: 'Correo enviado' });
  } catch (error) {
    console.error('Error enviando formulario', error);
    next(error);
  }
}