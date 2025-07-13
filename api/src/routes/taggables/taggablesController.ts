import { Request, Response } from 'express';
import { db } from '../../db/index';
import { taggablesTable } from '../../db/taggablesSchema';
import { eq } from 'drizzle-orm';

export async function createTaggable(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nuevo] = await db.insert(taggablesTable).values(data).returning();
    res.status(201).json(nuevo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear taggable' });
  }
}

export async function listTaggables(_req: Request, res: Response) {
  try {
    const taggables = await db.select().from(taggablesTable);
    res.status(200).json(taggables);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los taggables' });
  }
}

export async function getTaggable(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [taggable] = await db.select().from(taggablesTable).where(eq(taggablesTable.id, id));
    if (!taggable) {
      res.status(404).json({ error: 'Taggable no encontrado' });
    } else {
      res.status(200).json(taggable);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el taggable' });
  }
}

export async function updateTaggable(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await db
      .update(taggablesTable)
      .set(req.cleanBody)
      .where(eq(taggablesTable.id, id))
      .returning();
    if (!updated) {
      res.status(404).json({ error: 'Taggable no encontrado' });
    } else {
      res.status(200).json(updated);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar taggable' });
  }
}

export async function deleteTaggable(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(taggablesTable)
      .where(eq(taggablesTable.id, id))
      .returning();
    if (!deleted) {
      res.status(404).json({ error: 'Taggable no encontrado' });
    } else {
      res.status(200).json({ message: 'Taggable eliminado correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar taggable' });
  }
}
