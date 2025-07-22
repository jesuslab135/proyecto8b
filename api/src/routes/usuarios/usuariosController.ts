// src/routes/usuariosController.ts
import { Request, Response } from 'express';
import { db } from '../../db';
import { usuariosTable } from '../../db/usuariosSchema';
import { eq } from 'drizzle-orm';

export async function createUsuario(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nuevo] = await db.insert(usuariosTable).values(data).returning();
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
}

export async function listUsuarios(_req: Request, res: Response) {
  try {
    const usuarios = await db.select().from(usuariosTable);
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
}

export async function getUsuario(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [usuario] = await db.select().from(usuariosTable).where(eq(usuariosTable.id, id));

    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
}

export async function updateUsuario(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await db
      .update(usuariosTable)
      .set(req.cleanBody)
      .where(eq(usuariosTable.id, id))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
}

export async function deleteUsuario(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(usuariosTable)
      .where(eq(usuariosTable.id, id))
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
}
