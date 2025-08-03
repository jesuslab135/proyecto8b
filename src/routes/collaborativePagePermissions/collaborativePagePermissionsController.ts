// src/routes/collaborative-page-permissions/collaborativePagePermissionsController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { collaborativePagePermissionsTable } from '../../db/collaborativePagePermissionsSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /collaborative-page-permissions:
 *   post:
 *     summary: Crear un nuevo permiso de página colaborativa
 *     tags: [collaborativePagePermissions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - page_id
 *               - user_id
 *               - permission_type_id
 *             properties:
 *               page_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               permission_type_id:
 *                 type: integer
 *               granted_by:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Permiso de página colaborativa creado exitosamente
 *       500:
 *         description: Error al crear el permiso de página colaborativa
 */
export async function createCollaborativePagePermission(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    const [newRecord] = await db.insert(collaborativePagePermissionsTable).values(data).returning();
    res.status(201).json(newRecord);
  } catch (e) {
    console.error('❌ Error en createCollaborativePagePermission:', e);
    res.status(500).json({ error: 'Error al crear el permiso de página colaborativa' });
  }
}

/**
 * @swagger
 * /collaborative-page-permissions:
 *   get:
 *     summary: Obtener todos los permisos de página colaborativa
 *     tags: [collaborativePagePermissions]
 *     responses:
 *       200:
 *         description: Lista de permisos de página colaborativa
 *       500:
 *         description: Error al obtener los permisos de página colaborativa
 */
export async function listCollaborativePagePermissions(req: Request, res: Response) {
  try {
    const records = await db.select().from(collaborativePagePermissionsTable);
    res.status(200).json(records);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los permisos de página colaborativa' });
  }
}

/**
 * @swagger
 * /collaborative-page-permissions/{id}:
 *   get:
 *     summary: Obtener un permiso de página colaborativa por ID
 *     tags: [collaborativePagePermissions]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del permiso de página colaborativa
 *     responses:
 *       200:
 *         description: Permiso de página colaborativa encontrado
 *       404:
 *         description: Permiso de página colaborativa no encontrado
 *       500:
 *         description: Error al obtener el permiso de página colaborativa
 */
export async function getCollaborativePagePermission(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [record] = await db.select().from(collaborativePagePermissionsTable).where(eq(collaborativePagePermissionsTable.id, id));
    if (!record) {
      return res.status(404).json({ error: 'Permiso de página colaborativa no encontrado' });
    }
    res.status(200).json(record);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el permiso de página colaborativa' });
  }
}

/**
 * @swagger
 * /collaborative-page-permissions/{id}:
 *   put:
 *     summary: Actualizar un permiso de página colaborativa por ID
 *     tags: [collaborativePagePermissions]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del permiso de página colaborativa a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page_id:
 *                 type: integer
 *               user_id:
 *                 type: integer
 *               permission_type_id:
 *                 type: integer
 *               granted_by:
 *                 type: integer
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Permiso de página colaborativa actualizado correctamente
 *       404:
 *         description: Permiso de página colaborativa no encontrado
 *       500:
 *         description: Error al actualizar el permiso de página colaborativa
 */
export async function updateCollaborativePagePermission(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const data = req.cleanBody;
    const [updatedRecord] = await db.update(collaborativePagePermissionsTable).set(data).where(eq(collaborativePagePermissionsTable.id, id)).returning();
    if (!updatedRecord) {
      return res.status(404).json({ error: 'Permiso de página colaborativa no encontrado' });
    }
    res.status(200).json(updatedRecord);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el permiso de página colaborativa' });
  }
}

/**
 * @swagger
 * /collaborative-page-permissions/{id}:
 *   delete:
 *     summary: Eliminar un permiso de página colaborativa por ID
 *     tags: [collaborativePagePermissions]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del permiso de página colaborativa a eliminar
 *     responses:
 *       200:
 *         description: Permiso de página colaborativa eliminado correctamente
 *       404:
 *         description: Permiso de página colaborativa no encontrado
 *       500:
 *         description: Error al eliminar el permiso de página colaborativa
 */
export async function deleteCollaborativePagePermission(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deletedRecord] = await db.delete(collaborativePagePermissionsTable).where(eq(collaborativePagePermissionsTable.id, id)).returning();
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Permiso de página colaborativa no encontrado' });
    }
    res.status(200).json({ message: 'Permiso de página colaborativa eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el permiso de página colaborativa' });
  }
}
