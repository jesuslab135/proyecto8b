// src/routes/versionesBloquesController.ts
import { Request, Response } from 'express';
import { db } from '../../db';
import { versionesBloquesTable } from '../../db/versionesBloquesSchema';
import { eq } from 'drizzle-orm';

export async function createVersionBloque(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nueva] = await db.insert(versionesBloquesTable).values(data).returning();
    res.status(201).json(nueva);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear versión del bloque' });
  }
}

export async function listVersionesBloques(_req: Request, res: Response) {
  try {
    const versiones = await db.select().from(versionesBloquesTable);
    res.status(200).json(versiones);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener versiones' });
  }
}

export async function getVersionBloque(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [version] = await db
      .select()
      .from(versionesBloquesTable)
      .where(eq(versionesBloquesTable.id, id));

    if (!version) {
      return res.status(404).json({ error: 'Versión no encontrada' });
    }

    res.status(200).json(version);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener versión del bloque' });
  }
}

export async function updateVersionBloque(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await db
      .update(versionesBloquesTable)
      .set(req.cleanBody)
      .where(eq(versionesBloquesTable.id, id))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: 'Versión no encontrada' });
    }

    res.status(200).json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar versión' });
  }
}

export async function deleteVersionBloque(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(versionesBloquesTable)
      .where(eq(versionesBloquesTable.id, id))
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: 'Versión no encontrada' });
    }

    res.status(200).json({ message: 'Versión eliminada correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar versión' });
  }
}
