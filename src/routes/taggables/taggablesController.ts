import { Request, Response } from 'express';
import { db } from '../../db/index';
import { taggablesTable } from '../../db/taggablesSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * tags:
 *   name: taggables
 *   description: Gestión de relaciones de etiquetas
 */

/**
 * @swagger
 * /taggables:
 *   post:
 *     summary: Crear un nuevo taggable
 *     tags: [taggables]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tag_id
 *               - taggable_id
 *               - taggable_type
 *             properties:
 *               tag_id:
 *                 type: integer
 *               taggable_id:
 *                 type: integer
 *               taggable_type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Taggable creado correctamente
 *       500:
 *         description: Error al crear taggable
 */
export async function createTaggable(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    const [nuevo] = await db.insert(taggablesTable).values(data).returning();
    res.status(201).json(nuevo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear taggable' });
  }
}

/**
 * @swagger
 * /taggables:
 *   get:
 *     summary: Obtener todos los taggables
 *     tags: [taggables]
 *     responses:
 *       200:
 *         description: Lista de taggables
 *       500:
 *         description: Error al obtener los taggables
 */
export async function listTaggables(_req: Request, res: Response) {
  try {
    const taggables = await db.select().from(taggablesTable);
    res.status(200).json(taggables);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los taggables' });
  }
}

/**
 * @swagger
 * /taggables/{id}:
 *   get:
 *     summary: Obtener un taggable por ID
 *     tags: [taggables]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del taggable
 *     responses:
 *       200:
 *         description: Taggable encontrado
 *       404:
 *         description: Taggable no encontrado
 *       500:
 *         description: Error al obtener el taggable
 */
export async function getTaggable(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [taggable] = await db.select().from(taggablesTable).where(eq(taggablesTable.id, id));
    if (!taggable) {
      res.status(404).json({ error: 'Taggable no encontrado' });
    } else {
      res.status(200).json(taggable);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el taggable' });
  }
}

/**
 * @swagger
 * /taggables/{id}:
 *   put:
 *     summary: Actualizar un taggable
 *     tags: [taggables]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del taggable
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tag_id:
 *                 type: integer
 *               taggable_id:
 *                 type: integer
 *               taggable_type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Taggable actualizado correctamente
 *       404:
 *         description: Taggable no encontrado
 *       500:
 *         description: Error al actualizar taggable
 */
export async function updateTaggable(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await db
      .update(taggablesTable)
      .set(req.cleanBody)
      .where(eq(taggablesTable.id, id))
      .returning();
    if (!updated) {
      res.status(404).json({ error: 'Taggable no encontrado' });
    } else {
      res.status(200).json(updated);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar taggable' });
  }
}

/**
 * @swagger
 * /taggables/{id}:
 *   delete:
 *     summary: Eliminar un taggable
 *     tags: [taggables]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del taggable
 *     responses:
 *       200:
 *         description: Taggable eliminado correctamente
 *       404:
 *         description: Taggable no encontrado
 *       500:
 *         description: Error al eliminar taggable
 */
export async function deleteTaggable(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(taggablesTable)
      .where(eq(taggablesTable.id, id))
      .returning();
    if (!deleted) {
      res.status(404).json({ error: 'Taggable no encontrado' });
    } else {
      res.status(200).json({ message: 'Taggable eliminado correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar taggable' });
  }
}
