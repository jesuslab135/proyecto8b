import { Request, Response } from 'express';
import { db } from '../../db';
import { eq } from 'drizzle-orm';
import { usuariosTable } from '../../db/usuariosSchema';
import { tokensInicialesAccesoTable } from '../../db/tokensInicialesAccesoSchema';
import bcrypt from 'bcryptjs';

export async function solicitarToken(req: Request, res: Response) {
  const { correo } = req.body;

  const [usuario] = await db.select().from(usuariosTable).where(eq(usuariosTable.correo, correo));
  if (!usuario) return res.status(404).json({ error: 'Correo no registrado por la universidad' });

  const [token] = await db
    .select()
    .from(tokensInicialesAccesoTable)
    .where(eq(tokensInicialesAccesoTable.correo, correo));

  if (!token) return res.status(404).json({ error: 'Token no encontrado para este correo' });

  // Enviar token (simulado)
  console.log(`Enviando token ${token.token_acceso} al correo ${correo}`);

  res.json({ message: 'Token enviado al correo', enviado: true });
}

export async function verificarToken(req: Request, res: Response) {
  const { correo, token_acceso } = req.body;

  const [token] = await db
    .select()
    .from(tokensInicialesAccesoTable)
    .where(eq(tokensInicialesAccesoTable.correo, correo));

  if (!token || token.token_acceso !== token_acceso)
    return res.status(400).json({ error: 'Token inválido o incorrecto' });

  if (token.usado)
    return res.status(400).json({ error: 'Este token ya fue utilizado' });

  res.json({ message: 'Token válido' });
}

export async function cambiarContrasena(req: Request, res: Response) {
  const { correo, token_acceso, nueva_contraseña } = req.body;

  const [token] = await db
    .select()
    .from(tokensInicialesAccesoTable)
    .where(eq(tokensInicialesAccesoTable.correo, correo));

  if (!token || token.token_acceso !== token_acceso || token.usado)
    return res.status(400).json({ error: 'Token inválido o ya usado' });

  const contraseña_hash = await bcrypt.hash(nueva_contraseña, 10);

  const [updated] = await db
    .update(usuariosTable)
    .set({
      contraseña_hash,
      verificado: true,
      debe_cambiar_contraseña: false,
    })
    .where(eq(usuariosTable.correo, correo))
    .returning();

  await db
    .update(tokensInicialesAccesoTable)
    .set({ usado: true })
    .where(eq(tokensInicialesAccesoTable.correo, correo));

  if (!updated) return res.status(500).json({ error: 'Error al actualizar contraseña' });

  res.json({ message: 'Contraseña actualizada correctamente' });
}
