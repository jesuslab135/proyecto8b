// src/routes/relacionesBloquesController.ts
import { Request, Response } from 'express';
import { db } from '../../db';
import { relacionesBloquesTable } from '../../db/relacionesBloquesSchema';
import { eq } from 'drizzle-orm';

export async function createRelacionBloque(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nuevaRelacion] = await db
      .insert(relacionesBloquesTable)
      .values(data)
      .returning();
    res.status(201).json(nuevaRelacion);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear la relación de bloque' });
  }
}

export async function listRelacionesBloques(_req: Request, res: Response) {
  try {
    const relaciones = await db.select().from(relacionesBloquesTable);
    res.status(200).json(relaciones);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener relaciones de bloques' });
  }
}

export async function getRelacionBloque(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [relacion] = await db
      .select()
      .from(relacionesBloquesTable)
      .where(eq(relacionesBloquesTable.id, id));

    if (!relacion) {
      return res.status(404).json({ error: 'Relación no encontrada' });
    }

    res.status(200).json(relacion);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener la relación' });
  }
}

export async function updateRelacionBloque(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [actualizada] = await db
      .update(relacionesBloquesTable)
      .set(req.cleanBody)
      .where(eq(relacionesBloquesTable.id, id))
      .returning();

    if (!actualizada) {
      return res.status(404).json({ error: 'Relación no encontrada' });
    }

    res.status(200).json(actualizada);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la relación' });
  }
}

export async function deleteRelacionBloque(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [eliminada] = await db
      .delete(relacionesBloquesTable)
      .where(eq(relacionesBloquesTable.id, id))
      .returning();

    if (!eliminada) {
      return res.status(404).json({ error: 'Relación no encontrada' });
    }

    res.status(200).json({ message: 'Relación eliminada correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la relación' });
  }
}
