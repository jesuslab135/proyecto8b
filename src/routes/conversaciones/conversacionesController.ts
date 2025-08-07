// src/routes/conversacionesController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { conversacionesTable } from '../../db/conversacionesSchema';
import { eq, and } from 'drizzle-orm';

/**
 * @swagger
 * /conversaciones:
 *   post:
 *     summary: Crear una nueva conversación entre dos usuarios
 *     tags: [conversaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario_1_id
 *               - usuario_2_id
 *             properties:
 *               usuario_1_id:
 *                 type: integer
 *               usuario_2_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Conversación creada exitosamente
 *       409:
 *         description: La conversación ya existe
 *       500:
 *         description: Error al crear la conversación
 */
export async function createConversacion(req: Request, res: Response) {
  try {
    const { id, usuario_1_id, usuario_2_id } = req.cleanBody;

    const existing = await db
      .select()
      .from(conversacionesTable)
      .where(
        and(
          eq(conversacionesTable.usuario_1_id, usuario_1_id),
          eq(conversacionesTable.usuario_2_id, usuario_2_id)
        )
      );

    if (existing.length > 0) {
      return res.status(409).json({ error: 'La conversación ya existe' });
    }

    const [nuevaConversacion] = await db
      .insert(conversacionesTable)
      .values({ usuario_1_id, usuario_2_id })
      .returning();

    res.status(201).json(nuevaConversacion);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear la conversación' });
  }
}

/**
 * @swagger
 * /conversaciones:
 *   get:
 *     summary: Obtener todas las conversaciones
 *     tags: [conversaciones]
 *     responses:
 *       200:
 *         description: Lista de conversaciones
 *       500:
 *         description: Error al obtener conversaciones
 */
export async function listConversaciones(_req: Request, res: Response) {
  try {
    const conversaciones = await db.select().from(conversacionesTable);
    res.status(200).json(conversaciones);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener conversaciones' });
  }
}

/**
 * @swagger
 * /conversaciones/{id}:
 *   get:
 *     summary: Obtener una conversación por ID
 *     tags: [conversaciones]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la conversación
 *     responses:
 *       200:
 *         description: Conversación encontrada
 *       404:
 *         description: Conversación no encontrada
 *       500:
 *         description: Error al obtener la conversación
 */
export async function getConversacion(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [conv] = await db
      .select()
      .from(conversacionesTable)
      .where(eq(conversacionesTable.id, id));

    if (!conv) {
      res.status(404).json({ error: 'Conversación no encontrada' });
    } else {
      res.status(200).json(conv);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener la conversación' });
  }
}

/**
 * @swagger
 * /conversaciones/{id}:
 *   delete:
 *     summary: Eliminar una conversación por ID
 *     tags: [conversaciones]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la conversación a eliminar
 *     responses:
 *       200:
 *         description: Conversación eliminada correctamente
 *       404:
 *         description: Conversación no encontrada
 *       500:
 *         description: Error al eliminar la conversación
 */
export async function deleteConversacion(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(conversacionesTable)
      .where(eq(conversacionesTable.id, id))
      .returning();

    if (!deleted) {
      res.status(404).json({ error: 'Conversación no encontrada' });
    } else {
      res.status(200).json({ message: 'Conversación eliminada correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la conversación' });
  }
}
