// src/routes/experiencia-usuario/experienciaUsuarioController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { experienciaUsuarioTable } from '../../db/experienciaUsuarioSchema';
import { eq } from 'drizzle-orm';

export async function createExperiencia(req: Request, res: Response) {
  try {
    const [newExp] = await db.insert(experienciaUsuarioTable).values(req.cleanBody).returning();
    res.status(201).json(newExp);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear experiencia' });
  }
}

export async function listExperiencias(_req: Request, res: Response) {
  try {
    const experiencias = await db.select().from(experienciaUsuarioTable);
    res.status(200).json(experiencias);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener experiencias' });
  }
}

export async function getExperiencia(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [exp] = await db.select().from(experienciaUsuarioTable).where(eq(experienciaUsuarioTable.id, id));
    if (!exp) return res.status(404).json({ error: 'Experiencia no encontrada' });
    res.status(200).json(exp);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener experiencia' });
  }
}

export async function updateExperiencia(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await db
      .update(experienciaUsuarioTable)
      .set(req.cleanBody)
      .where(eq(experienciaUsuarioTable.id, id))
      .returning();

    if (!updated) return res.status(404).json({ error: 'Experiencia no encontrada' });
    res.status(200).json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar experiencia' });
  }
}

export async function deleteExperiencia(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(experienciaUsuarioTable)
      .where(eq(experienciaUsuarioTable.id, id))
      .returning();

    if (!deleted) return res.status(404).json({ error: 'Experiencia no encontrada' });
    res.status(200).json({ message: 'Experiencia eliminada correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar experiencia' });
  }
}
