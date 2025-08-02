// src/routes/content-types/contentTypesController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { contentTypesTable } from '../../db/contentTypesSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /content-types:
 *   post:
 *     summary: Crear un nuevo tipo de contenido
 *     tags: [contentTypes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Tipo de contenido creado exitosamente
 *       500:
 *         description: Error al crear el tipo de contenido
 */
export async function createContentType(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    const [newRecord] = await db.insert(contentTypesTable).values(data).returning();
    res.status(201).json(newRecord);
  } catch (e) {
    console.error('❌ Error en createContentType:', e);
    res.status(500).json({ error: 'Error al crear el tipo de contenido' });
  }
}

/**
 * @swagger
 * /content-types:
 *   get:
 *     summary: Obtener todos los tipos de contenido
 *     tags: [contentTypes]
 *     responses:
 *       200:
 *         description: Lista de tipos de contenido
 *       500:
 *         description: Error al obtener los tipos de contenido
 */
export async function listContentTypes(req: Request, res: Response) {
  try {
    const records = await db.select().from(contentTypesTable);
    res.status(200).json(records);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los tipos de contenido' });
  }
}

/**
 * @swagger
 * /content-types/{id}:
 *   get:
 *     summary: Obtener un tipo de contenido por ID
 *     tags: [contentTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de contenido
 *     responses:
 *       200:
 *         description: Tipo de contenido encontrado
 *       404:
 *         description: Tipo de contenido no encontrado
 *       500:
 *         description: Error al obtener el tipo de contenido
 */
export async function getContentType(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [record] = await db.select().from(contentTypesTable).where(eq(contentTypesTable.id, id));
    if (!record) {
      return res.status(404).json({ error: 'Tipo de contenido no encontrado' });
    }
    res.status(200).json(record);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el tipo de contenido' });
  }
}

/**
 * @swagger
 * /content-types/{id}:
 *   put:
 *     summary: Actualizar un tipo de contenido por ID
 *     tags: [contentTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de contenido a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tipo de contenido actualizado correctamente
 *       404:
 *         description: Tipo de contenido no encontrado
 *       500:
 *         description: Error al actualizar el tipo de contenido
 */
export async function updateContentType(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const data = req.cleanBody;
    const [updatedRecord] = await db.update(contentTypesTable).set(data).where(eq(contentTypesTable.id, id)).returning();
    if (!updatedRecord) {
      return res.status(404).json({ error: 'Tipo de contenido no encontrado' });
    }
    res.status(200).json(updatedRecord);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el tipo de contenido' });
  }
}

/**
 * @swagger
 * /content-types/{id}:
 *   delete:
 *     summary: Eliminar un tipo de contenido por ID
 *     tags: [contentTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de contenido a eliminar
 *     responses:
 *       200:
 *         description: Tipo de contenido eliminado correctamente
 *       404:
 *         description: Tipo de contenido no encontrado
 *       500:
 *         description: Error al eliminar el tipo de contenido
 */
export async function deleteContentType(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deletedRecord] = await db.delete(contentTypesTable).where(eq(contentTypesTable.id, id)).returning();
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Tipo de contenido no encontrado' });
    }
    res.status(200).json({ message: 'Tipo de contenido eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el tipo de contenido' });
  }
}
