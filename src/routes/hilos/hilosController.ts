// src/routes/hilos/hilosController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { hilosTable } from '../../db/hilosSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /hilos:
 *   post:
 *     summary: Crear un nuevo hilo
 *     tags: [hilos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - foro_id
 *               - titulo
 *               - contenido
 *               - autor_id
 *             properties:
 *               foro_id:
 *                 type: integer
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *               autor_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Hilo creado exitosamente
 *       500:
 *         description: Error al crear el hilo
 */
export async function createHilo(req: Request, res: Response) {
  try {
    const {id, ...data} = req.cleanBody;
    const [newHilo] = await db.insert(hilosTable).values(data).returning();
    res.status(201).json(newHilo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear el hilo' });
  }
}

/**
 * @swagger
 * /hilos:
 *   get:
 *     summary: Obtener todos los hilos
 *     tags: [hilos]
 *     responses:
 *       200:
 *         description: Lista de hilos
 *       500:
 *         description: Error al obtener los hilos
 */
export async function listHilos(_req: Request, res: Response) {
  try {
    const hilos = await db.select().from(hilosTable);
    res.status(200).json(hilos);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los hilos' });
  }
}

/**
 * @swagger
 * /hilos/{id}:
 *   get:
 *     summary: Obtener un hilo por ID
 *     tags: [hilos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del hilo
 *     responses:
 *       200:
 *         description: Hilo encontrado
 *       404:
 *         description: Hilo no encontrado
 *       500:
 *         description: Error al obtener el hilo
 */
export async function getHilo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [hilo] = await db.select().from(hilosTable).where(eq(hilosTable.id, id));
    if (!hilo) {
      res.status(404).json({ error: 'Hilo no encontrado' });
    } else {
      res.status(200).json(hilo);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el hilo' });
  }
}

/**
 * @swagger
 * /hilos/{id}:
 *   put:
 *     summary: Actualizar un hilo por ID
 *     tags: [hilos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del hilo a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *     responses:
 *       200:
 *         description: Hilo actualizado correctamente
 *       404:
 *         description: Hilo no encontrado
 *       500:
 *         description: Error al actualizar el hilo
 */
export async function updateHilo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updatedHilo] = await db
      .update(hilosTable)
      .set(req.cleanBody)
      .where(eq(hilosTable.id, id))
      .returning();
    if (!updatedHilo) {
      res.status(404).json({ error: 'Hilo no encontrado' });
    } else {
      res.status(200).json(updatedHilo);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el hilo' });
  }
}

/**
 * @swagger
 * /hilos/{id}:
 *   delete:
 *     summary: Eliminar un hilo por ID
 *     tags: [hilos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del hilo
 *     responses:
 *       200:
 *         description: Hilo eliminado correctamente
 *       404:
 *         description: Hilo no encontrado
 *       500:
 *         description: Error al eliminar el hilo
 */
export async function deleteHilo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db.delete(hilosTable).where(eq(hilosTable.id, id)).returning();
    if (!deleted) {
      res.status(404).json({ error: 'Hilo no encontrado' });
    } else {
      res.status(200).json({ message: 'Hilo eliminado correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el hilo' });
  }
}
