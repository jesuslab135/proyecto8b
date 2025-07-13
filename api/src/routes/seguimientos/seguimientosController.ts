// src/routes/seguimientosController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { seguimientosTable } from '../../db/seguimientosSchema';
import { eq } from 'drizzle-orm';

export async function createSeguimiento(req: Request, res: Response) {
  try {
    const data = req.cleanBody;

    // Validación extra opcional (ya se hace en schema, pero se refuerza aquí)
    if ((data.seguido_usuario_id && data.seguido_proyecto_id) || (!data.seguido_usuario_id && !data.seguido_proyecto_id)) {
      return res.status(400).json({ error: 'Debes especificar solo uno: seguido_usuario_id o seguido_proyecto_id' });
    }

    const [nuevo] = await db.insert(seguimientosTable).values(data).returning();
    res.status(201).json(nuevo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear el seguimiento' });
  }
}

export async function listSeguimientos(_req: Request, res: Response) {
  try {
    const seguimientos = await db.select().from(seguimientosTable);
    res.status(200).json(seguimientos);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los seguimientos' });
  }
}

export async function getSeguimiento(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [seguimiento] = await db
      .select()
      .from(seguimientosTable)
      .where(eq(seguimientosTable.id, id));

    if (!seguimiento) {
      return res.status(404).json({ error: 'Seguimiento no encontrado' });
    }

    res.status(200).json(seguimiento);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener seguimiento' });
  }
}

export async function updateSeguimiento(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const data = req.cleanBody;

    if ((data.seguido_usuario_id && data.seguido_proyecto_id) || (!data.seguido_usuario_id && !data.seguido_proyecto_id)) {
      return res.status(400).json({ error: 'Debes especificar solo uno: seguido_usuario_id o seguido_proyecto_id' });
    }

    const [updated] = await db
      .update(seguimientosTable)
      .set(data)
      .where(eq(seguimientosTable.id, id))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: 'Seguimiento no encontrado' });
    }

    res.status(200).json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar seguimiento' });
  }
}


export async function deleteSeguimiento(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(seguimientosTable)
      .where(eq(seguimientosTable.id, id))
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: 'Seguimiento no encontrado' });
    }

    res.status(200).json({ message: 'Seguimiento eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar seguimiento' });
  }
}
