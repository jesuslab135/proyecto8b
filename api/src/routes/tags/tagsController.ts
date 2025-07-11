// src/routes/tagsController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { tagsTable } from '../../db/tagsSchema';
import { eq } from 'drizzle-orm';

export async function createTag(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [newTag] = await db.insert(tagsTable).values(data).returning();
    res.status(201).json(newTag);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear el tag' });
  }
}

export async function listTags(_req: Request, res: Response) {
  try {
    const tags = await db.select().from(tagsTable);
    res.status(200).json(tags);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los tags' });
  }
}

export async function getTag(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [tag] = await db.select().from(tagsTable).where(eq(tagsTable.id, id));
    if (!tag) {
      res.status(404).json({ error: 'Tag no encontrado' });
    } else {
      res.status(200).json(tag);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el tag' });
  }
}

export async function updateTag(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updatedTag] = await db
      .update(tagsTable)
      .set(req.cleanBody)
      .where(eq(tagsTable.id, id))
      .returning();
    if (!updatedTag) {
      res.status(404).json({ error: 'Tag no encontrado' });
    } else {
      res.status(200).json(updatedTag);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el tag' });
  }
}

export async function deleteTag(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db.delete(tagsTable).where(eq(tagsTable.id, id)).returning();
    if (!deleted) {
      res.status(404).json({ error: 'Tag no encontrado' });
    } else {
      res.status(200).json({ message: 'Tag eliminado correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el tag' });
  }
}
