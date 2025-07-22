// src/routes/rolesUsuarioController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { rolesUsuarioTable } from '../../db/rolesUsuarioSchema';
import { eq } from 'drizzle-orm';

export async function createRolUsuario(req: Request, res: Response) {
  try {
    const {id, ...data} = req.cleanBody;
    const [newRol] = await db.insert(rolesUsuarioTable).values(data).returning();
    res.status(201).json(newRol);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear el rol de usuario' });
  }
}

export async function listRolesUsuario(_req: Request, res: Response) {
  try {
    const roles = await db.select().from(rolesUsuarioTable);
    res.status(200).json(roles);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los roles de usuario' });
  }
}

export async function getRolUsuario(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [rol] = await db
      .select()
      .from(rolesUsuarioTable)
      .where(eq(rolesUsuarioTable.id, id));

    if (!rol) {
      res.status(404).json({ error: 'Rol de usuario no encontrado' });
    } else {
      res.status(200).json(rol);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el rol de usuario' });
  }
}

export async function updateRolUsuario(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await db
      .update(rolesUsuarioTable)
      .set(req.cleanBody)
      .where(eq(rolesUsuarioTable.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: 'Rol de usuario no encontrado' });
    } else {
      res.status(200).json(updated);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el rol de usuario' });
  }
}

export async function deleteRolUsuario(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(rolesUsuarioTable)
      .where(eq(rolesUsuarioTable.id, id))
      .returning();

    if (!deleted) {
      res.status(404).json({ error: 'Rol de usuario no encontrado' });
    } else {
      res.status(200).json({ message: 'Rol de usuario eliminado correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el rol de usuario' });
  }
}
