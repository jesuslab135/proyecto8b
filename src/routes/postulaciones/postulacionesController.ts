import { Request, Response } from 'express';
import { db } from '../../db/index';
import { postulacionesTable } from '../../db/postulacionesSchema'; 
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /postulaciones:
 *   post:
 *     summary: Crear una nueva postulación
 *     tags: [postulaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - proyecto_id
 *               - usuario_id
 *             properties:
 *               proyecto_id:
 *                 type: integer
 *               usuario_id:
 *                 type: integer
 *               mensaje:
 *                 type: string
 *     responses:
 *       201:
 *         description: Postulación creada exitosamente
 *       500:
 *         description: Error al crear la postulación
 */
export async function createPostulacion(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    const [nueva] = await db.insert(postulacionesTable).values(data).returning();
    res.status(201).json(nueva);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear la postulaciones' });
  }
}

/**
 * @swagger
 * /postulaciones:
 *   get:
 *     summary: Obtener todas las postulaciones
 *     tags: [postulaciones]
 *     responses:
 *       200:
 *         description: Lista de postulaciones
 *       500:
 *         description: Error al obtener las postulaciones
 */
export async function listPostulaciones(_req: Request, res: Response) {
  try {
    const postulacion = await db.select().from(postulacionesTable);
    res.status(200).json(postulacion);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las postulaciones' });
  }
}

/**
 * @swagger
 * /postulaciones/{id}:
 *   get:
 *     summary: Obtener una postulación por ID
 *     tags: [postulaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la postulación
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Postulación encontrada
 *       404:
 *         description: Postulación no encontrada
 *       500:
 *         description: Error al obtener la postulación
 */
export async function getPostulacion(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [postulacion] = await db
      .select()
      .from(postulacionesTable)
      .where(eq(postulacionesTable.id, id));

    if (!postulacion) {
      res.status(404).json({ error: 'Postulacion no encontrada' });
    } else {
      res.status(200).json(postulacion);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener la postulacion' });
  }
}

/**
 * @swagger
 * /postulaciones/{id}:
 *   put:
 *     summary: Actualizar una postulación
 *     tags: [postulaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la postulación
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               mensaje:
 *                 type: string
 *     responses:
 *       200:
 *         description: Postulación actualizada correctamente
 *       404:
 *         description: Postulación no encontrada
 *       500:
 *         description: Error al actualizar la postulación
 */
export async function updatePostulacion(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [actualizada] = await db
      .update(postulacionesTable)
      .set(req.cleanBody)
      .where(eq(postulacionesTable.id, id))
      .returning();

    if (!actualizada) {
      res.status(404).json({ error: 'Postulacion no encontrada' });
    } else {
      res.status(200).json(actualizada);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la postulacion' });
  }
}

/**
 * @swagger
 * /postulaciones/{id}:
 *   delete:
 *     summary: Eliminar una postulación
 *     tags: [postulaciones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la postulación
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Postulación eliminada correctamente
 *       404:
 *         description: Postulación no encontrada
 *       500:
 *         description: Error al eliminar la postulación
 */
export async function deletePostulacion(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [eliminada] = await db
      .delete(postulacionesTable)
      .where(eq(postulacionesTable.id, id))
      .returning();

    if (!eliminada) {
      res.status(404).json({ error: 'Postulacion no encontrada' });
    } else {
      res.status(200).json({ message: 'Postulacion eliminada correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la postulacion' });
  }
}
