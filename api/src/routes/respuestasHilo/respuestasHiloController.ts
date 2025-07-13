// src/routes/respuestasHiloController.ts
import { Request, Response } from 'express';
import { db } from '../../db';
import { respuestasHiloTable } from '../../db/respuestasHiloSchema';
import { eq } from 'drizzle-orm';

export async function createRespuestaHilo(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nueva] = await db.insert(respuestasHiloTable).values(data).returning();
    res.status(201).json(nueva);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear la respuesta al hilo' });
  }
}

export async function listRespuestasHilo(_req: Request, res: Response) {
  try {
    const respuestas = await db.select().from(respuestasHiloTable);
    res.status(200).json(respuestas);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las respuestas' });
  }
}

export async function getRespuestaHilo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [respuesta] = await db
      .select()
      .from(respuestasHiloTable)
      .where(eq(respuestasHiloTable.id, id));

    if (!respuesta) {
      return res.status(404).json({ error: 'Respuesta no encontrada' });
    }

    res.status(200).json(respuesta);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener respuesta' });
  }
}

export async function updateRespuestaHilo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const updates = req.cleanBody;

    const [actualizada] = await db
      .update(respuestasHiloTable)
      .set(updates)
      .where(eq(respuestasHiloTable.id, id))
      .returning();

    if (!actualizada) {
      return res.status(404).json({ error: 'Respuesta no encontrada' });
    }

    res.status(200).json(actualizada);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar respuesta' });
  }
}

export async function deleteRespuestaHilo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(respuestasHiloTable)
      .where(eq(respuestasHiloTable.id, id))
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: 'Respuesta no encontrada' });
    }

    res.status(200).json({ message: 'Respuesta eliminada correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar respuesta' });
  }
}
