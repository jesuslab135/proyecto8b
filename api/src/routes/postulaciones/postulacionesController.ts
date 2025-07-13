// src/routes/postulacionesController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { postulacionesTable } from '../../db/postulacionesSchema'; 
import { eq } from 'drizzle-orm';

export async function createPostulacion(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nueva] = await db.insert(postulacionesTable).values(data).returning();
    res.status(201).json(nueva);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear la oportunidad' });
  }
}

export async function listPostulaciones(_req: Request, res: Response) {
  try {
    const postulacion = await db.select().from(postulacionesTable);
    res.status(200).json(postulacion);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las postulaciones' });
  }
}

export async function getPostulacion(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [postulacion] = await db
      .select()
      .from(postulacionesTable)
      .where(eq(postulacionesTable.id, id));

    if (!postulacion) {
      res.status(404).json({ error: 'Postulacion no encontrada' });
    } else {
      res.status(200).json(postulacion);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener la postulacion' });
  }
}

export async function updatePostulacion(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [actualizada] = await db
      .update(postulacionesTable)
      .set(req.cleanBody)
      .where(eq(postulacionesTable.id, id))
      .returning();

    if (!actualizada) {
      res.status(404).json({ error: 'Postulacion no encontrada' });
    } else {
      res.status(200).json(actualizada);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la postulacion' });
  }
}

export async function deletePostulacion(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [eliminada] = await db
      .delete(postulacionesTable)
      .where(eq(postulacionesTable.id, id))
      .returning();

    if (!eliminada) {
      res.status(404).json({ error: 'Postulacion no encontrada' });
    } else {
      res.status(200).json({ message: 'Postulacion eliminada correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la postulacion' });
  }
}
