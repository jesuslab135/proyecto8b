// src/routes/forosController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { forosTable } from '../../db/forosSchema';
import { eq } from 'drizzle-orm';

export async function createForo(req: Request, res: Response) {
  try {
    const {id, ...data} = req.cleanBody;
    const [newForo] = await db.insert(forosTable).values(data).returning();
    res.status(201).json(newForo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear el foro' });
  }
}

export async function listForos(_req: Request, res: Response) {
  try {
    const foros = await db.select().from(forosTable);
    res.status(200).json(foros);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los foros' });
  }
}

export async function getForo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [foro] = await db.select().from(forosTable).where(eq(forosTable.id, id));
    if (!foro) {
      res.status(404).json({ error: 'Foro no encontrado' });
    } else {
      res.status(200).json(foro);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el foro' });
  }
}

export async function updateForo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updatedForo] = await db
      .update(forosTable)
      .set(req.cleanBody)
      .where(eq(forosTable.id, id))
      .returning();
    if (!updatedForo) {
      res.status(404).json({ error: 'Foro no encontrado' });
    } else {
      res.status(200).json(updatedForo);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el foro' });
  }
}

export async function deleteForo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db.delete(forosTable).where(eq(forosTable.id, id)).returning();
    if (!deleted) {
      res.status(404).json({ error: 'Foro no encontrado' });
    } else {
      res.status(200).json({ message: 'Foro eliminado correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el foro' });
  }
}
