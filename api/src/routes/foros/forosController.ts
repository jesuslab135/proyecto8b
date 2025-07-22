// src/routes/forosController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { forosTable } from '../../db/forosSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /foros:
 *   post:
 *     summary: Crear un nuevo foro
 *     tags: [foros]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - creador_id
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               creador_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Foro creado exitosamente
 *       500:
 *         description: Error al crear el foro
 */
export async function createForo(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    const [newForo] = await db.insert(forosTable).values(data).returning();
    res.status(201).json(newForo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear el foro' });
  }
}

/**
 * @swagger
 * /foros:
 *   get:
 *     summary: Obtener todos los foros
 *     tags: [foros]
 *     responses:
 *       200:
 *         description: Lista de foros
 *       500:
 *         description: Error al obtener los foros
 */
export async function listForos(_req: Request, res: Response) {
  try {
    const foros = await db.select().from(forosTable);
    res.status(200).json(foros);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los foros' });
  }
}

/**
 * @swagger
 * /foros/{id}:
 *   get:
 *     summary: Obtener un foro por ID
 *     tags: [foros]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del foro
 *     responses:
 *       200:
 *         description: Foro encontrado
 *       404:
 *         description: Foro no encontrado
 *       500:
 *         description: Error al obtener el foro
 */
export async function getForo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [foro] = await db.select().from(forosTable).where(eq(forosTable.id, id));
    if (!foro) {
      res.status(404).json({ error: 'Foro no encontrado' });
    } else {
      res.status(200).json(foro);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el foro' });
  }
}

/**
 * @swagger
 * /foros/{id}:
 *   put:
 *     summary: Actualizar un foro por ID
 *     tags: [foros]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del foro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       200:
 *         description: Foro actualizado
 *       404:
 *         description: Foro no encontrado
 *       500:
 *         description: Error al actualizar el foro
 */
export async function updateForo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updatedForo] = await db
      .update(forosTable)
      .set(req.cleanBody)
      .where(eq(forosTable.id, id))
      .returning();
    if (!updatedForo) {
      res.status(404).json({ error: 'Foro no encontrado' });
    } else {
      res.status(200).json(updatedForo);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el foro' });
  }
}

/**
 * @swagger
 * /foros/{id}:
 *   delete:
 *     summary: Eliminar un foro por ID
 *     tags: [foros]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del foro
 *     responses:
 *       200:
 *         description: Foro eliminado correctamente
 *       404:
 *         description: Foro no encontrado
 *       500:
 *         description: Error al eliminar el foro
 */
export async function deleteForo(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db.delete(forosTable).where(eq(forosTable.id, id)).returning();
    if (!deleted) {
      res.status(404).json({ error: 'Foro no encontrado' });
    } else {
      res.status(200).json({ message: 'Foro eliminado correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el foro' });
  }
}
