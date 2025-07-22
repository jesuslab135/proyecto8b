import { Request, Response } from 'express';
import { parseCSV } from '../../utils/csvParser';
import { db } from '../../db';
import { usuariosTable } from '../../db/usuariosSchema';
import { tokensInicialesAccesoTable } from '../../db/tokensInicialesAccesoSchema';
import { generateToken } from '../../utils/tokenGenerator';
import { sendTokenEmail } from '../../utils/emailSender';

export async function registrarUsuariosDesdeCSV(req: Request, res: Response) {
  try {
    const filePath = req.file?.path;
    if (!filePath) return res.status(400).json({ error: 'Archivo CSV requerido' });

    const registros = await parseCSV(filePath);

    for (const registro of registros) {
      const { nombre, correo, rol_id, universidad_id, matricula, telefono } = registro;

      const [usuario] = await db
        .insert(usuariosTable)
        .values({
          nombre,
          correo,
          rol_id: parseInt(rol_id),
          universidad_id: parseInt(universidad_id),
          matricula,
          telefono,
        })
        .returning();

      const token = generateToken(12);

      await db.insert(tokensInicialesAccesoTable).values({
        usuario_id: usuario.id,
        correo: correo,
        token_acceso: token,
      });

      await sendTokenEmail(correo, token);
    }

    res.status(201).json({ message: 'Usuarios y tokens creados con éxito' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar usuarios' });
  }
}
