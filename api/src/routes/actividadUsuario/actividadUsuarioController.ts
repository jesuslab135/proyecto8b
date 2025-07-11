// src/routes/actividadUsuarioController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { actividadUsuarioTable } from '../../db/actividadUsuarioSchema';
import { eq } from 'drizzle-orm';

export async function createActividadUsuario(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nuevaActividad] = await db.insert(actividadUsuarioTable).values(data).returning();
    res.status(201).json(nuevaActividad);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear la actividad de usuario' });
  }
}

export async function listActividadUsuario(_req: Request, res: Response) {
  try {
    const actividades = await db.select().from(actividadUsuarioTable);
    res.status(200).json(actividades);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las actividades de usuario' });
  }
}

export async function getActividadUsuario(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [actividad] = await db
      .select()
      .from(actividadUsuarioTable)
      .where(eq(actividadUsuarioTable.id, id));

    if (!actividad) {
      res.status(404).json({ error: 'Actividad de usuario no encontrada' });
    } else {
      res.status(200).json(actividad);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener la actividad de usuario' });
  }
}

export async function updateActividadUsuario(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [actualizada] = await db
      .update(actividadUsuarioTable)
      .set(req.cleanBody)
      .where(eq(actividadUsuarioTable.id, id))
      .returning();

    if (!actualizada) {
      res.status(404).json({ error: 'Actividad de usuario no encontrada' });
    } else {
      res.status(200).json(actualizada);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la actividad de usuario' });
  }
}

export async function deleteActividadUsuario(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [eliminada] = await db
      .delete(actividadUsuarioTable)
      .where(eq(actividadUsuarioTable.id, id))
      .returning();

    if (!eliminada) {
      res.status(404).json({ error: 'Actividad de usuario no encontrada' });
    } else {
      res.status(200).json({ message: 'Actividad eliminada correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la actividad de usuario' });
  }
}
