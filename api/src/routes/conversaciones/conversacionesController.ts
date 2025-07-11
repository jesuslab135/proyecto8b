// src/routes/conversacionesController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { conversacionesTable } from '../../db/conversacionesSchema';
import { eq, and } from 'drizzle-orm';

export async function createConversacion(req: Request, res: Response) {
  try {
    const { usuario_1_id, usuario_2_id } = req.cleanBody;

    // evitar duplicados sin importar el orden de los usuarios
    const existing = await db
      .select()
      .from(conversacionesTable)
      .where(
        and(
          eq(conversacionesTable.usuario_1_id, usuario_1_id),
          eq(conversacionesTable.usuario_2_id, usuario_2_id)
        )
      );

    if (existing.length > 0) {
      return res.status(409).json({ error: 'La conversación ya existe' });
    }

    const [nuevaConversacion] = await db
      .insert(conversacionesTable)
      .values({ usuario_1_id, usuario_2_id })
      .returning();

    res.status(201).json(nuevaConversacion);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear la conversación' });
  }
}

export async function listConversaciones(_req: Request, res: Response) {
  try {
    const conversaciones = await db.select().from(conversacionesTable);
    res.status(200).json(conversaciones);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener conversaciones' });
  }
}

export async function getConversacion(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [conv] = await db
      .select()
      .from(conversacionesTable)
      .where(eq(conversacionesTable.id, id));

    if (!conv) {
      res.status(404).json({ error: 'Conversación no encontrada' });
    } else {
      res.status(200).json(conv);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener la conversación' });
  }
}

export async function deleteConversacion(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(conversacionesTable)
      .where(eq(conversacionesTable.id, id))
      .returning();

    if (!deleted) {
      res.status(404).json({ error: 'Conversación no encontrada' });
    } else {
      res.status(200).json({ message: 'Conversación eliminada correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la conversación' });
  }
}
