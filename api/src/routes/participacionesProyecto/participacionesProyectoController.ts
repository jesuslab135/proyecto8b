// src/routes/postulacionesController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { participacionesProyectoTable } from '../../db/participacionesProyectoSchema'; 
import { eq } from 'drizzle-orm';

export async function createParticipacionProyecto(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nueva] = await db.insert(participacionesProyectoTable).values(data).returning();
    res.status(201).json(nueva);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear la participaciones de proyecto' });
  }
}

export async function listParticipacionesProyecto(_req: Request, res: Response) {
  try {
    const parProy = await db.select().from(participacionesProyectoTable);
    res.status(200).json(parProy);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las participaciones de proyecto' });
  }
}

export async function getParticipacionProyecto(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [parProy] = await db
      .select()
      .from(participacionesProyectoTable)
      .where(eq(participacionesProyectoTable.id, id));

    if (!parProy) {
      res.status(404).json({ error: 'Participacion de Proyecto no encontrada' });
    } else {
      res.status(200).json(parProy);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener la Participacion de Proyecto' });
  }
}

export async function updateParticipacionProyecto(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [actualizada] = await db
      .update(participacionesProyectoTable)
      .set(req.cleanBody)
      .where(eq(participacionesProyectoTable.id, id))
      .returning();

    if (!actualizada) {
      res.status(404).json({ error: 'Participacion de Proyecto no encontrada' });
    } else {
      res.status(200).json(actualizada);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la Participacion de Proyecto' });
  }
}

export async function deleteParticipacionProyecto(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [eliminada] = await db
      .delete(participacionesProyectoTable)
      .where(eq(participacionesProyectoTable.id, id))
      .returning();

    if (!eliminada) {
      res.status(404).json({ error: 'Participacion de Proyecto no encontrada' });
    } else {
      res.status(200).json({ message: 'Participacion de Proyecto eliminada correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la Participacion de Proyecto' });
  }
}
