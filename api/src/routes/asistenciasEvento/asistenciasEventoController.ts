// src/routes/asistenciasEventoController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { asistenciasEventoTable } from '../../db/asistenciasEventoSchema';
import { eq } from 'drizzle-orm';

export async function createAsistenciaEvento(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nuevaAsistencia] = await db.insert(asistenciasEventoTable).values(data).returning();
    res.status(201).json(nuevaAsistencia);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al registrar asistencia' });
  }
}

export async function listAsistenciasEvento(_req: Request, res: Response) {
  try {
    const asistencias = await db.select().from(asistenciasEventoTable);
    res.status(200).json(asistencias);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener asistencias' });
  }
}

export async function getAsistenciaEvento(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [asistencia] = await db
      .select()
      .from(asistenciasEventoTable)
      .where(eq(asistenciasEventoTable.id, id));

    if (!asistencia) {
      res.status(404).json({ error: 'Asistencia no encontrada' });
    } else {
      res.status(200).json(asistencia);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener asistencia' });
  }
}

export async function updateAsistenciaEvento(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [actualizada] = await db
      .update(asistenciasEventoTable)
      .set(req.cleanBody)
      .where(eq(asistenciasEventoTable.id, id))
      .returning();

    if (!actualizada) {
      res.status(404).json({ error: 'Asistencia no encontrada' });
    } else {
      res.status(200).json(actualizada);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar asistencia' });
  }
}

export async function deleteAsistenciaEvento(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [eliminada] = await db
      .delete(asistenciasEventoTable)
      .where(eq(asistenciasEventoTable.id, id))
      .returning();

    if (!eliminada) {
      res.status(404).json({ error: 'Asistencia no encontrada' });
    } else {
      res.status(200).json({ message: 'Asistencia eliminada correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar asistencia' });
  }
}
