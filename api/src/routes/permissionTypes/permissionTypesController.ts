// src/routes/permission-types/permissionTypesController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { permissionTypesTable } from '../../db/permissionTypesSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /permission-types:
 *   post:
 *     summary: Crear un nuevo tipo de permiso
 *     tags: [permissionTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - code
 *               - name
 *             properties:
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       201:
 *         description: Tipo de permiso creado exitosamente
 *       500:
 *         description: Error al crear el tipo de permiso
 */
export async function createPermissionType(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    const [newRecord] = await db.insert(permissionTypesTable).values(data).returning();
    res.status(201).json(newRecord);
  } catch (e) {
    console.error('❌ Error en createPermissionType:', e);
    res.status(500).json({ error: 'Error al crear el tipo de permiso' });
  }
}

/**
 * @swagger
 * /permission-types:
 *   get:
 *     summary: Obtener todos los tipos de permiso
 *     tags: [permissionTypes]
 *     responses:
 *       200:
 *         description: Lista de tipos de permiso
 *       500:
 *         description: Error al obtener los tipos de permiso
 */
export async function listPermissionTypes(req: Request, res: Response) {
  try {
    const records = await db.select().from(permissionTypesTable);
    res.status(200).json(records);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los tipos de permiso' });
  }
}

/**
 * @swagger
 * /permission-types/{id}:
 *   get:
 *     summary: Obtener un tipo de permiso por ID
 *     tags: [permissionTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de permiso
 *     responses:
 *       200:
 *         description: Tipo de permiso encontrado
 *       404:
 *         description: Tipo de permiso no encontrado
 *       500:
 *         description: Error al obtener el tipo de permiso
 */
export async function getPermissionType(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [record] = await db.select().from(permissionTypesTable).where(eq(permissionTypesTable.id, id));
    if (!record) {
      return res.status(404).json({ error: 'Tipo de permiso no encontrado' });
    }
    res.status(200).json(record);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el tipo de permiso' });
  }
}

/**
 * @swagger
 * /permission-types/{id}:
 *   put:
 *     summary: Actualizar un tipo de permiso por ID
 *     tags: [permissionTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de permiso a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       200:
 *         description: Tipo de permiso actualizado correctamente
 *       404:
 *         description: Tipo de permiso no encontrado
 *       500:
 *         description: Error al actualizar el tipo de permiso
 */
export async function updatePermissionType(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const data = req.cleanBody;
    const [updatedRecord] = await db.update(permissionTypesTable).set(data).where(eq(permissionTypesTable.id, id)).returning();
    if (!updatedRecord) {
      return res.status(404).json({ error: 'Tipo de permiso no encontrado' });
    }
    res.status(200).json(updatedRecord);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el tipo de permiso' });
  }
}

/**
 * @swagger
 * /permission-types/{id}:
 *   delete:
 *     summary: Eliminar un tipo de permiso por ID
 *     tags: [permissionTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de permiso a eliminar
 *     responses:
 *       200:
 *         description: Tipo de permiso eliminado correctamente
 *       404:
 *         description: Tipo de permiso no encontrado
 *       500:
 *         description: Error al eliminar el tipo de permiso
 */
export async function deletePermissionType(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deletedRecord] = await db.delete(permissionTypesTable).where(eq(permissionTypesTable.id, id)).returning();
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Tipo de permiso no encontrado' });
    }
    res.status(200).json({ message: 'Tipo de permiso eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el tipo de permiso' });
  }
}
