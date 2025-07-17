// src/routes/universidadesController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { universidadesTable } from '../../db/universidadesSchema';
import { eq } from 'drizzle-orm';

export async function createUniversidad(req: Request, res: Response) {
  try {
    const {id, ...data} = req.cleanBody;
    const [newUniversidad] = await db
      .insert(universidadesTable)
      .values(data)
      .returning();

    res.status(201).json(newUniversidad);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear la universidad' });
  }
}

export async function listUniversidades(_req: Request, res: Response) {
  try {
    const universidades = await db.select().from(universidadesTable);
    res.status(200).json(universidades);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las universidades' });
  }
}

export async function getUniversidad(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [universidad] = await db
      .select()
      .from(universidadesTable)
      .where(eq(universidadesTable.id, id));

    if (!universidad) {
      res.status(404).json({ error: 'Universidad no encontrada' });
    } else {
      res.status(200).json(universidad);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener la universidad' });
  }
}

export async function updateUniversidad(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updatedUniversidad] = await db
      .update(universidadesTable)
      .set(req.cleanBody)
      .where(eq(universidadesTable.id, id))
      .returning();

    if (!updatedUniversidad) {
      res.status(404).json({ error: 'Universidad no encontrada' });
    } else {
      res.status(200).json(updatedUniversidad);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la universidad' });
  }
}

export async function deleteUniversidad(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(universidadesTable)
      .where(eq(universidadesTable.id, id))
      .returning();

    if (!deleted) {
      res.status(404).json({ error: 'Universidad no encontrada' });
    } else {
      res.status(200).json({ message: 'Universidad eliminada correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la universidad' });
  }
}
