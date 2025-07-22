// src/routes/proyectos-validaciones/proyectosValidacionesController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { proyectosValidacionesTable } from '../../db/proyectosValidacionesSchema';
import { eq } from 'drizzle-orm';

export async function createProyectoValidacion(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nuevaValidacion] = await db.insert(proyectosValidacionesTable).values(data).returning();
    res.status(201).json(nuevaValidacion);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear la validación del proyecto' });
  }
}

export async function listProyectosValidaciones(_req: Request, res: Response) {
  try {
    const validaciones = await db.select().from(proyectosValidacionesTable);
    res.status(200).json(validaciones);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las validaciones' });
  }
}

export async function getProyectoValidacion(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [validacion] = await db
      .select()
      .from(proyectosValidacionesTable)
      .where(eq(proyectosValidacionesTable.id, id));

    if (!validacion) {
      res.status(404).json({ error: 'Validación no encontrada' });
    } else {
      res.status(200).json(validacion);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener la validación' });
  }
}

export async function updateProyectoValidacion(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const updates = req.cleanBody;
    const [updated] = await db
      .update(proyectosValidacionesTable)
      .set(updates)
      .where(eq(proyectosValidacionesTable.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: 'Validación no encontrada' });
    } else {
      res.status(200).json(updated);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la validación' });
  }
}

export async function deleteProyectoValidacion(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(proyectosValidacionesTable)
      .where(eq(proyectosValidacionesTable.id, id))
      .returning();

    if (!deleted) {
      res.status(404).json({ error: 'Validación no encontrada' });
    } else {
      res.status(200).json({ message: 'Validación eliminada correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la validación' });
  }
}
