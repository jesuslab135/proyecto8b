// src/routes/reportesController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { reportesTable } from '../../db/reportesSchema';
import { eq } from 'drizzle-orm';

export async function createReporte(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [newReporte] = await db.insert(reportesTable).values(data).returning();
    res.status(201).json(newReporte);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear el reporte' });
  }
}

export async function listReportes(_req: Request, res: Response) {
  try {
    const reportes = await db.select().from(reportesTable);
    res.status(200).json(reportes);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los reportes' });
  }
}

export async function getReporte(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [reporte] = await db.select().from(reportesTable).where(eq(reportesTable.id, id));
    if (!reporte) {
      res.status(404).json({ error: 'Reporte no encontrado' });
    } else {
      res.status(200).json(reporte);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el reporte' });
  }
}

export async function updateReporte(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updatedReporte] = await db
      .update(reportesTable)
      .set(req.cleanBody)
      .where(eq(reportesTable.id, id))
      .returning();
    if (!updatedReporte) {
      res.status(404).json({ error: 'Reporte no encontrado' });
    } else {
      res.status(200).json(updatedReporte);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el reporte' });
  }
}

export async function deleteReporte(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db.delete(reportesTable).where(eq(reportesTable.id, id)).returning();
    if (!deleted) {
      res.status(404).json({ error: 'Reporte no encontrado' });
    } else {
      res.status(200).json({ message: 'Reporte eliminado correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el reporte' });
  }
}
