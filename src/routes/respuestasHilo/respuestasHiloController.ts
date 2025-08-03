import { Request, Response } from 'express';
import { db } from '../../db';
import { respuestasHiloTable } from '../../db/respuestasHiloSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /respuestas-hilo:
 *   post:
 *     summary: Crear una nueva respuesta en un hilo
 *     tags: [respuestasHilo]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - hilo_id
 *               - usuario_id
 *               - contenido
 *             properties:
 *               hilo_id:
 *                 type: integer
 *               usuario_id:
 *                 type: integer
 *               contenido:
 *                 type: string
 *     responses:
 *       201:
 *         description: Respuesta creada correctamente
 *       500:
 *         description: Error al crear la respuesta al hilo
 */
export async function createRespuestaHilo(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nueva] = await db.insert(respuestasHiloTable).values(data).returning();
    res.status(201).json(nueva);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear la respuesta al hilo' });
  }
}

/**
 * @swagger
 * /respuestas-hilo:
 *   get:
 *     summary: Obtener todas las respuestas a hilos
 *     tags: [respuestasHilo]
 *     responses:
 *       200:
 *         description: Lista de respuestas obtenida correctamente
 *       500:
 *         description: Error al obtener las respuestas
 */
export async function listRespuestasHilo(_req: Request, res: Response) {
  try {
    const respuestas = await db.select().from(respuestasHiloTable);
    res.status(200).json(respuestas);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las respuestas' });
  }
}

/**
 * @swagger
 * /respuestas-hilo/{id}:
 *   get:
 *     summary: Obtener una respuesta por ID
 *     tags: [respuestasHilo]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la respuesta
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Respuesta encontrada
 *       404:
 *         description: Respuesta no encontrada
 *       500:
 *         description: Error al obtener la respuesta
 */
export async function getRespuestaHilo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [respuesta] = await db
      .select()
      .from(respuestasHiloTable)
      .where(eq(respuestasHiloTable.id, id));

    if (!respuesta) {
      return res.status(404).json({ error: 'Respuesta no encontrada' });
    }

    res.status(200).json(respuesta);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener respuesta' });
  }
}

/**
 * @swagger
 * /respuestas-hilo/{id}:
 *   put:
 *     summary: Actualizar una respuesta en un hilo
 *     tags: [respuestasHilo]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la respuesta
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenido:
 *                 type: string
 *     responses:
 *       200:
 *         description: Respuesta actualizada correctamente
 *       404:
 *         description: Respuesta no encontrada
 *       500:
 *         description: Error al actualizar respuesta
 */
export async function updateRespuestaHilo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const updates = req.cleanBody;

    const [actualizada] = await db
      .update(respuestasHiloTable)
      .set(updates)
      .where(eq(respuestasHiloTable.id, id))
      .returning();

    if (!actualizada) {
      return res.status(404).json({ error: 'Respuesta no encontrada' });
    }

    res.status(200).json(actualizada);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar respuesta' });
  }
}

/**
 * @swagger
 * /respuestas-hilo/{id}:
 *   delete:
 *     summary: Eliminar una respuesta por ID
 *     tags: [respuestasHilo]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la respuesta
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Respuesta eliminada correctamente
 *       404:
 *         description: Respuesta no encontrada
 *       500:
 *         description: Error al eliminar respuesta
 */
export async function deleteRespuestaHilo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(respuestasHiloTable)
      .where(eq(respuestasHiloTable.id, id))
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: 'Respuesta no encontrada' });
    }

    res.status(200).json({ message: 'Respuesta eliminada correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar respuesta' });
  }
}
