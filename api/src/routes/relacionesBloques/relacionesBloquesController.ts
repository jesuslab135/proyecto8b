import { Request, Response } from 'express';
import { db } from '../../db';
import { relacionesBloquesTable } from '../../db/relacionesBloquesSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /relaciones-bloques:
 *   post:
 *     summary: Crear una nueva relación entre bloques
 *     tags: [relacionesBloques]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - bloque_origen_id
 *               - bloque_destino_id
 *               - tipo
 *             properties:
 *               bloque_origen_id:
 *                 type: integer
 *               bloque_destino_id:
 *                 type: integer
 *               tipo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Relación de bloque creada correctamente
 *       500:
 *         description: Error al crear la relación
 */
export async function createRelacionBloque(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nuevaRelacion] = await db.insert(relacionesBloquesTable).values(data).returning();
    res.status(201).json(nuevaRelacion);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear la relación de bloque' });
  }
}

/**
 * @swagger
 * /relaciones-bloques:
 *   get:
 *     summary: Obtener todas las relaciones entre bloques
 *     tags: [relacionesBloques]
 *     responses:
 *       200:
 *         description: Lista de relaciones entre bloques
 *       500:
 *         description: Error al obtener relaciones
 */
export async function listRelacionesBloques(_req: Request, res: Response) {
  try {
    const relaciones = await db.select().from(relacionesBloquesTable);
    res.status(200).json(relaciones);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener relaciones de bloques' });
  }
}

/**
 * @swagger
 * /relaciones-bloques/{id}:
 *   get:
 *     summary: Obtener una relación de bloque por ID
 *     tags: [relacionesBloques]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la relación
 *     responses:
 *       200:
 *         description: Relación encontrada
 *       404:
 *         description: Relación no encontrada
 *       500:
 *         description: Error al obtener la relación
 */
export async function getRelacionBloque(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [relacion] = await db
      .select()
      .from(relacionesBloquesTable)
      .where(eq(relacionesBloquesTable.id, id));

    if (!relacion) {
      return res.status(404).json({ error: 'Relación no encontrada' });
    }

    res.status(200).json(relacion);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener la relación' });
  }
}

/**
 * @swagger
 * /relaciones-bloques/{id}:
 *   put:
 *     summary: Actualizar una relación entre bloques
 *     tags: [relacionesBloques]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la relación a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bloque_origen_id:
 *                 type: integer
 *               bloque_destino_id:
 *                 type: integer
 *               tipo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Relación actualizada correctamente
 *       404:
 *         description: Relación no encontrada
 *       500:
 *         description: Error al actualizar la relación
 */
export async function updateRelacionBloque(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [actualizada] = await db
      .update(relacionesBloquesTable)
      .set(req.cleanBody)
      .where(eq(relacionesBloquesTable.id, id))
      .returning();

    if (!actualizada) {
      return res.status(404).json({ error: 'Relación no encontrada' });
    }

    res.status(200).json(actualizada);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la relación' });
  }
}

/**
 * @swagger
 * /relaciones-bloques/{id}:
 *   delete:
 *     summary: Eliminar una relación entre bloques
 *     tags: [relacionesBloques]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la relación a eliminar
 *     responses:
 *       200:
 *         description: Relación eliminada correctamente
 *       404:
 *         description: Relación no encontrada
 *       500:
 *         description: Error al eliminar la relación
 */
export async function deleteRelacionBloque(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [eliminada] = await db
      .delete(relacionesBloquesTable)
      .where(eq(relacionesBloquesTable.id, id))
      .returning();

    if (!eliminada) {
      return res.status(404).json({ error: 'Relación no encontrada' });
    }

    res.status(200).json({ message: 'Relación eliminada correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la relación' });
  }
}
