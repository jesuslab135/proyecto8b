// src/routes/usersController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { usersTable } from '../../db/usersSchema';
import { eq } from 'drizzle-orm';
import bcrypt from 'bcryptjs';

export async function createUser(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    data.password = await bcrypt.hash(data.password, 10);

    const [newUser] = await db.insert(usersTable).values(data).returning();
    // Ocultamos la contraseña
    // @ts-ignore
    delete newUser.password;
    res.status(201).json(newUser);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
}

export async function listUsers(_req: Request, res: Response) {
  try {
    const users = await db.select().from(usersTable);
    // Ocultar contraseñas
    const result = users.map((u) => {
      // @ts-ignore
      delete u.password;
      return u;
    });
    res.status(200).json(result);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
}

export async function getUser(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [user] = await db.select().from(usersTable).where(eq(usersTable.id, id));
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    // @ts-ignore
    delete user.password;
    res.status(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
}

export async function updateUser(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const updates = req.cleanBody;

    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const [updated] = await db
      .update(usersTable)
      .set(updates)
      .where(eq(usersTable.id, id))
      .returning();

    if (!updated) return res.status(404).json({ error: 'Usuario no encontrado' });
    // @ts-ignore
    delete updated.password;
    res.status(200).json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
}

export async function deleteUser(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(usersTable)
      .where(eq(usersTable.id, id))
      .returning();

    if (!deleted) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
}
