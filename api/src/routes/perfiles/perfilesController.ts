import { Request, Response } from 'express';
import { db } from '../../db/index';
import { perfilesTable } from '../../db/perfilesSchema';
import { eq } from 'drizzle-orm';

export async function createPerfil(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nuevo] = await db.insert(perfilesTable).values(data).returning();
    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear perfil' });
  }
}

export async function listPerfiles(_req: Request, res: Response) {
  try {
    const resultados = await db.select().from(perfilesTable);
    res.status(200).json(resultados);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener perfiles' });
  }
}

export async function getPerfil(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [perfil] = await db
      .select()
      .from(perfilesTable)
      .where(eq(perfilesTable.id, id));

    if (!perfil) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }

    res.status(200).json(perfil);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
}

export async function updatePerfil(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const updates = req.cleanBody;

    const [actualizado] = await db
      .update(perfilesTable)
      .set(updates)
      .where(eq(perfilesTable.id, id))
      .returning();

    if (!actualizado) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }

    res.status(200).json(actualizado);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar perfil' });
  }
}

export async function deletePerfil(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [eliminado] = await db
      .delete(perfilesTable)
      .where(eq(perfilesTable.id, id))
      .returning();

    if (!eliminado) {
      return res.status(404).json({ error: 'Perfil no encontrado' });
    }

    res.status(200).json({ message: 'Perfil eliminado correctamente' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar perfil' });
  }
}
