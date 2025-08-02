import { Request, Response } from 'express';
import { db } from '../../db/index';
import { rolesProyectoTable } from '../../db/rolesProyectoSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /roles-proyecto:
 *   post:
 *     summary: Crear un nuevo rol de proyecto
 *     tags: [rolesProyecto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rol de proyecto creado correctamente
 *       500:
 *         description: Error al crear el rol de proyecto
 */
export async function createRolProyecto(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    const [newRol] = await db.insert(rolesProyectoTable).values(data).returning();
    res.status(201).json(newRol);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear el rol de proyecto' });
  }
}

/**
 * @swagger
 * /roles-proyecto:
 *   get:
 *     summary: Obtener todos los roles de proyecto
 *     tags: [rolesProyecto]
 *     responses:
 *       200:
 *         description: Lista de roles obtenida correctamente
 *       500:
 *         description: Error al obtener los roles de proyecto
 */
export async function listRolesProyecto(_req: Request, res: Response) {
  try {
    const roles = await db.select().from(rolesProyectoTable);
    res.status(200).json(roles);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los roles de proyecto' });
  }
}

/**
 * @swagger
 * /roles-proyecto/{id}:
 *   get:
 *     summary: Obtener un rol de proyecto por ID
 *     tags: [rolesProyecto]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del rol de proyecto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rol encontrado
 *       404:
 *         description: Rol de proyecto no encontrado
 *       500:
 *         description: Error al obtener el rol de proyecto
 */
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

/**
 * @swagger
 * /roles-proyecto/{id}:
 *   put:
 *     summary: Actualizar un rol de proyecto
 *     tags: [rolesProyecto]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del rol de proyecto
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Rol actualizado correctamente
 *       404:
 *         description: Rol de proyecto no encontrado
 *       500:
 *         description: Error al actualizar el rol de proyecto
 */
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

/**
 * @swagger
 * /roles-proyecto/{id}:
 *   delete:
 *     summary: Eliminar un rol de proyecto por ID
 *     tags: [rolesProyecto]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del rol de proyecto
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Rol eliminado correctamente
 *       404:
 *         description: Rol de proyecto no encontrado
 *       500:
 *         description: Error al eliminar el rol de proyecto
 */
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
