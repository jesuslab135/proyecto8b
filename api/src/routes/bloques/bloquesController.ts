// src/routes/bloquesController.ts
import { Request, Response } from 'express';
import { db } from '../../db';
import { bloquesTable } from '../../db/bloquesSchema';
import { eq } from 'drizzle-orm';

export async function createBloque(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nuevo] = await db.insert(bloquesTable).values(data).returning();
    res.status(201).json(nuevo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear bloque' });
  }
}

export async function listBloques(_req: Request, res: Response) {
  try {
    const bloques = await db.select().from(bloquesTable);
    res.status(200).json(bloques);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener bloques' });
  }
}

export async function getBloque(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [bloque] = await db.select().from(bloquesTable).where(eq(bloquesTable.id, id));
    if (!bloque) {
      return res.status(404).json({ error: 'Bloque no encontrado' });
    }
    res.status(200).json(bloque);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener bloque' });
  }
}

export async function updateBloque(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await db
      .update(bloquesTable)
      .set(req.cleanBody)
      .where(eq(bloquesTable.id, id))
      .returning();
    if (!updated) {
      return res.status(404).json({ error: 'Bloque no encontrado' });
    }
    res.status(200).json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar bloque' });
  }
}

export async function deleteBloque(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(bloquesTable)
      .where(eq(bloquesTable.id, id))
      .returning();
    if (!deleted) {
      return res.status(404).json({ error: 'Bloque no encontrado' });
    }
    res.status(200).json({ message: 'Bloque eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar bloque' });
  }
}
