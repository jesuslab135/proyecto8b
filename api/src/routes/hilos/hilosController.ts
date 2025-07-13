// src/routes/hilos/hilosController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { hilosTable } from '../../db/hilosSchema';
import { eq } from 'drizzle-orm';

export async function createHilo(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [newHilo] = await db.insert(hilosTable).values(data).returning();
    res.status(201).json(newHilo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear el hilo' });
  }
}

export async function listHilos(_req: Request, res: Response) {
  try {
    const hilos = await db.select().from(hilosTable);
    res.status(200).json(hilos);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los hilos' });
  }
}

export async function getHilo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [hilo] = await db.select().from(hilosTable).where(eq(hilosTable.id, id));
    if (!hilo) {
      res.status(404).json({ error: 'Hilo no encontrado' });
    } else {
      res.status(200).json(hilo);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el hilo' });
  }
}

export async function updateHilo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updatedHilo] = await db
      .update(hilosTable)
      .set(req.cleanBody)
      .where(eq(hilosTable.id, id))
      .returning();
    if (!updatedHilo) {
      res.status(404).json({ error: 'Hilo no encontrado' });
    } else {
      res.status(200).json(updatedHilo);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el hilo' });
  }
}

export async function deleteHilo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db.delete(hilosTable).where(eq(hilosTable.id, id)).returning();
    if (!deleted) {
      res.status(404).json({ error: 'Hilo no encontrado' });
    } else {
      res.status(200).json({ message: 'Hilo eliminado correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el hilo' });
  }
}
