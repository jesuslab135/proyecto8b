// src/routes/rolesProyectoController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { rolesProyectoTable } from '../../db/rolesProyectoSchema';
import { eq } from 'drizzle-orm';

export async function createRolProyecto(req: Request, res: Response) {
  try {
    const {id, ...data} = req.cleanBody;
    const [newRol] = await db.insert(rolesProyectoTable).values(data).returning();
    res.status(201).json(newRol);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear el rol de proyecto' });
  }
}

export async function listRolesProyecto(_req: Request, res: Response) {
  try {
    const roles = await db.select().from(rolesProyectoTable);
    res.status(200).json(roles);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los roles de proyecto' });
  }
}

export async function getRolProyecto(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [rol] = await db
      .select()
      .from(rolesProyectoTable)
      .where(eq(rolesProyectoTable.id, id));

    if (!rol) {
      res.status(404).json({ error: 'Rol de proyecto no encontrado' });
    } else {
      res.status(200).json(rol);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el rol de proyecto' });
  }
}

export async function updateRolProyecto(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await db
      .update(rolesProyectoTable)
      .set(req.cleanBody)
      .where(eq(rolesProyectoTable.id, id))
      .returning();

    if (!updated) {
      res.status(404).json({ error: 'Rol de proyecto no encontrado' });
    } else {
      res.status(200).json(updated);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el rol de proyecto' });
  }
}

export async function deleteRolProyecto(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(rolesProyectoTable)
      .where(eq(rolesProyectoTable.id, id))
      .returning();

    if (!deleted) {
      res.status(404).json({ error: 'Rol de proyecto no encontrado' });
    } else {
      res.status(200).json({ message: 'Rol de proyecto eliminado correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el rol de proyecto' });
  }
}
