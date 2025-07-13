// src/routes/proyectos/proyectosController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { proyectosTable } from '../../db/proyectosSchema';
import { eq } from 'drizzle-orm';

export async function createProyecto(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [newProyecto] = await db.insert(proyectosTable).values(data).returning();
    res.status(201).json(newProyecto);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear el proyecto' });
  }
}

export async function listProyectos(_req: Request, res: Response) {
  try {
    const proyectos = await db.select().from(proyectosTable);
    res.status(200).json(proyectos);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los proyectos' });
  }
}

export async function getProyecto(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [proyecto] = await db
      .select()
      .from(proyectosTable)
      .where(eq(proyectosTable.id, id));
    if (!proyecto) {
      res.status(404).json({ error: 'Proyecto no encontrado' });
    } else {
      res.status(200).json(proyecto);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el proyecto' });
  }
}

export async function updateProyecto(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const updates = req.cleanBody;
    const [updated] = await db
      .update(proyectosTable)
      .set(updates)
      .where(eq(proyectosTable.id, id))
      .returning();
    if (!updated) {
      res.status(404).json({ error: 'Proyecto no encontrado' });
    } else {
      res.status(200).json(updated);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el proyecto' });
  }
}

export async function deleteProyecto(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(proyectosTable)
      .where(eq(proyectosTable.id, id))
      .returning();
    if (!deleted) {
      res.status(404).json({ error: 'Proyecto no encontrado' });
    } else {
      res.status(200).json({ message: 'Proyecto eliminado correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el proyecto' });
  }
}
