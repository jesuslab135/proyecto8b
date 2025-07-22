import { Request, Response } from 'express';
import { db } from '../../db/index';
import { seguimientosTable } from '../../db/seguimientosSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /seguimientos:
 *   post:
 *     summary: Crear un nuevo seguimiento
 *     tags: [seguimientos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - seguidor_id
 *             properties:
 *               seguidor_id:
 *                 type: integer
 *               seguido_usuario_id:
 *                 type: integer
 *               seguido_proyecto_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Seguimiento creado correctamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error al crear el seguimiento
 */
export async function createSeguimiento(req: Request, res: Response) {
  try {
    const data = req.cleanBody;

    if ((data.seguido_usuario_id && data.seguido_proyecto_id) || (!data.seguido_usuario_id && !data.seguido_proyecto_id)) {
      return res.status(400).json({ error: 'Debes especificar solo uno: seguido_usuario_id o seguido_proyecto_id' });
    }

    const [nuevo] = await db.insert(seguimientosTable).values(data).returning();
    res.status(201).json(nuevo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear el seguimiento' });
  }
}

/**
 * @swagger
 * /seguimientos:
 *   get:
 *     summary: Obtener todos los seguimientos
 *     tags: [seguimientos]
 *     responses:
 *       200:
 *         description: Lista de seguimientos
 *       500:
 *         description: Error al obtener los seguimientos
 */
export async function listSeguimientos(_req: Request, res: Response) {
  try {
    const seguimientos = await db.select().from(seguimientosTable);
    res.status(200).json(seguimientos);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los seguimientos' });
  }
}

/**
 * @swagger
 * /seguimientos/{id}:
 *   get:
 *     summary: Obtener un seguimiento por ID
 *     tags: [seguimientos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del seguimiento
 *     responses:
 *       200:
 *         description: Seguimiento encontrado
 *       404:
 *         description: Seguimiento no encontrado
 *       500:
 *         description: Error al obtener seguimiento
 */
export async function getSeguimiento(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [seguimiento] = await db
      .select()
      .from(seguimientosTable)
      .where(eq(seguimientosTable.id, id));

    if (!seguimiento) {
      return res.status(404).json({ error: 'Seguimiento no encontrado' });
    }

    res.status(200).json(seguimiento);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener seguimiento' });
  }
}

/**
 * @swagger
 * /seguimientos/{id}:
 *   put:
 *     summary: Actualizar un seguimiento
 *     tags: [seguimientos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del seguimiento
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seguido_usuario_id:
 *                 type: integer
 *               seguido_proyecto_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Seguimiento actualizado correctamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Seguimiento no encontrado
 *       500:
 *         description: Error al actualizar seguimiento
 */
export async function updateSeguimiento(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const data = req.cleanBody;

    if ((data.seguido_usuario_id && data.seguido_proyecto_id) || (!data.seguido_usuario_id && !data.seguido_proyecto_id)) {
      return res.status(400).json({ error: 'Debes especificar solo uno: seguido_usuario_id o seguido_proyecto_id' });
    }

    const [updated] = await db
      .update(seguimientosTable)
      .set(data)
      .where(eq(seguimientosTable.id, id))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: 'Seguimiento no encontrado' });
    }

    res.status(200).json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar seguimiento' });
  }
}

/**
 * @swagger
 * /seguimientos/{id}:
 *   delete:
 *     summary: Eliminar un seguimiento
 *     tags: [seguimientos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del seguimiento
 *     responses:
 *       200:
 *         description: Seguimiento eliminado correctamente
 *       404:
 *         description: Seguimiento no encontrado
 *       500:
 *         description: Error al eliminar seguimiento
 */
export async function deleteSeguimiento(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(seguimientosTable)
      .where(eq(seguimientosTable.id, id))
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: 'Seguimiento no encontrado' });
    }

    res.status(200).json({ message: 'Seguimiento eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar seguimiento' });
  }
}
