// src/routes/oportunidadesController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { oportunidadesTable } from '../../db/oportunidadesSchema';
import { eq } from 'drizzle-orm';

export async function createOportunidad(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nueva] = await db.insert(oportunidadesTable).values(data).returning();
    res.status(201).json(nueva);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear la oportunidad' });
  }
}

export async function listOportunidades(_req: Request, res: Response) {
  try {
    const oportunidades = await db.select().from(oportunidadesTable);
    res.status(200).json(oportunidades);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las oportunidades' });
  }
}

export async function getOportunidad(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [oportunidad] = await db
      .select()
      .from(oportunidadesTable)
      .where(eq(oportunidadesTable.id, id));

    if (!oportunidad) {
      res.status(404).json({ error: 'Oportunidad no encontrada' });
    } else {
      res.status(200).json(oportunidad);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener la oportunidad' });
  }
}

export async function updateOportunidad(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [actualizada] = await db
      .update(oportunidadesTable)
      .set(req.cleanBody)
      .where(eq(oportunidadesTable.id, id))
      .returning();

    if (!actualizada) {
      res.status(404).json({ error: 'Oportunidad no encontrada' });
    } else {
      res.status(200).json(actualizada);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la oportunidad' });
  }
}

export async function deleteOportunidad(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [eliminada] = await db
      .delete(oportunidadesTable)
      .where(eq(oportunidadesTable.id, id))
      .returning();

    if (!eliminada) {
      res.status(404).json({ error: 'Oportunidad no encontrada' });
    } else {
      res.status(200).json({ message: 'Oportunidad eliminada correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la oportunidad' });
  }
}
