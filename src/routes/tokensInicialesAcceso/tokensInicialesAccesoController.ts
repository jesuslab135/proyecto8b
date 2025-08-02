// src/routes/tokensInicialesAccesoController.ts
import { Request, Response } from 'express';
import { db } from '../../db';
import { tokensInicialesAccesoTable } from '../../db/tokensInicialesAccesoSchema';
import { eq } from 'drizzle-orm';

export async function createTokenInicialAcceso(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nuevo] = await db.insert(tokensInicialesAccesoTable).values(data).returning();
    res.status(201).json(nuevo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear el token de acceso' });
  }
}

export async function listTokensInicialesAcceso(_req: Request, res: Response) {
  try {
    const tokens = await db.select().from(tokensInicialesAccesoTable);
    res.status(200).json(tokens);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener tokens de acceso' });
  }
}

export async function getTokenInicialAcceso(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [token] = await db
      .select()
      .from(tokensInicialesAccesoTable)
      .where(eq(tokensInicialesAccesoTable.id, id));

    if (!token) {
      return res.status(404).json({ error: 'Token no encontrado' });
    }

    res.status(200).json(token);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener token' });
  }
}

export async function updateTokenInicialAcceso(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await db
      .update(tokensInicialesAccesoTable)
      .set(req.cleanBody)
      .where(eq(tokensInicialesAccesoTable.id, id))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: 'Token no encontrado' });
    }

    res.status(200).json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar token' });
  }
}

export async function deleteTokenInicialAcceso(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(tokensInicialesAccesoTable)
      .where(eq(tokensInicialesAccesoTable.id, id))
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: 'Token no encontrado' });
    }

    res.status(200).json({ message: 'Token eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar token' });
  }
}
