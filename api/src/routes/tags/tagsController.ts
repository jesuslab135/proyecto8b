import { Request, Response } from 'express';
import { db } from '../../db/index';
import { tagsTable } from '../../db/tagsSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * tags:
 *   name: tags
 *   description: Gestión de etiquetas del sistema
 */

/**
 * @swagger
 * /tags:
 *   post:
 *     summary: Crear un nuevo tag
 *     tags: [tags]
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
 *         description: Tag creado exitosamente
 *       500:
 *         description: Error al crear el tag
 */
export async function createTag(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    const [newTag] = await db.insert(tagsTable).values(data).returning();
    res.status(201).json(newTag);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear el tag' });
  }
}

/**
 * @swagger
 * /tags:
 *   get:
 *     summary: Obtener todos los tags
 *     tags: [tags]
 *     responses:
 *       200:
 *         description: Lista de tags
 *       500:
 *         description: Error al obtener los tags
 */
export async function listTags(_req: Request, res: Response) {
  try {
    const tags = await db.select().from(tagsTable);
    res.status(200).json(tags);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los tags' });
  }
}

/**
 * @swagger
 * /tags/{id}:
 *   get:
 *     summary: Obtener un tag por ID
 *     tags: [tags]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tag
 *     responses:
 *       200:
 *         description: Tag encontrado
 *       404:
 *         description: Tag no encontrado
 *       500:
 *         description: Error al obtener el tag
 */
export async function getTag(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [tag] = await db.select().from(tagsTable).where(eq(tagsTable.id, id));
    if (!tag) {
      res.status(404).json({ error: 'Tag no encontrado' });
    } else {
      res.status(200).json(tag);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el tag' });
  }
}

/**
 * @swagger
 * /tags/{id}:
 *   put:
 *     summary: Actualizar un tag
 *     tags: [tags]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tag a actualizar
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
 *         description: Tag actualizado correctamente
 *       404:
 *         description: Tag no encontrado
 *       500:
 *         description: Error al actualizar el tag
 */
export async function updateTag(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updatedTag] = await db
      .update(tagsTable)
      .set(req.cleanBody)
      .where(eq(tagsTable.id, id))
      .returning();
    if (!updatedTag) {
      res.status(404).json({ error: 'Tag no encontrado' });
    } else {
      res.status(200).json(updatedTag);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el tag' });
  }
}

/**
 * @swagger
 * /tags/{id}:
 *   delete:
 *     summary: Eliminar un tag
 *     tags: [tags]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tag a eliminar
 *     responses:
 *       200:
 *         description: Tag eliminado correctamente
 *       404:
 *         description: Tag no encontrado
 *       500:
 *         description: Error al eliminar el tag
 */
export async function deleteTag(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db.delete(tagsTable).where(eq(tagsTable.id, id)).returning();
    if (!deleted) {
      res.status(404).json({ error: 'Tag no encontrado' });
    } else {
      res.status(200).json({ message: 'Tag eliminado correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el tag' });
  }
}
