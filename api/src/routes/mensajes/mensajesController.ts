// src/routes/mensajesController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { mensajesTable } from '../../db/mensajesSchema';
import { eq } from 'drizzle-orm';

export async function createMensaje(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nuevoMensaje] = await db.insert(mensajesTable).values(data).returning();
    res.status(201).json(nuevoMensaje);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
}

export async function listMensajes(_req: Request, res: Response) {
  try {
    const mensajes = await db.select().from(mensajesTable);
    res.status(200).json(mensajes);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
}

export async function getMensaje(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [mensaje] = await db.select().from(mensajesTable).where(eq(mensajesTable.id, id));
    if (!mensaje) return res.status(404).json({ error: 'Mensaje no encontrado' });
    res.status(200).json(mensaje);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el mensaje' });
  }
}

export async function updateMensaje(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [actualizado] = await db
      .update(mensajesTable)
      .set(req.cleanBody)
      .where(eq(mensajesTable.id, id))
      .returning();

    if (!actualizado) return res.status(404).json({ error: 'Mensaje no encontrado' });
    res.status(200).json(actualizado);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el mensaje' });
  }
}

export async function deleteMensaje(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [eliminado] = await db
      .delete(mensajesTable)
      .where(eq(mensajesTable.id, id))
      .returning();

    if (!eliminado) return res.status(404).json({ error: 'Mensaje no encontrado' });
    res.status(200).json({ message: 'Mensaje eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el mensaje' });
  }
}
