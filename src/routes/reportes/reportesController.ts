// src/routes/reportes/reportesController.ts
import { Request, Response } from 'express';
import { db } from '../../db';
import { reportesTable } from '../../db/reportesSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /reportes:
 *   post:
 *     summary: Crear un nuevo reporte
 *     tags: [reportes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reportante_id
 *               - usuario_reportado_id
 *               - tipo_contenido
 *               - contenido_id
 *               - motivo
 *               - estado
 *             properties:
 *               reportante_id:
 *                 type: integer
 *               usuario_reportado_id:
 *                 type: integer
 *               tipo_contenido:
 *                 type: string
 *               contenido_id:
 *                 type: integer
 *               motivo:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reporte creado correctamente
 *       500:
 *         description: Error al crear el reporte
 */
export async function createReporte(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    const [nuevoReporte] = await db.insert(reportesTable).values(data).returning();
    res.status(201).json(nuevoReporte);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear el reporte' });
  }
}

/**
 * @swagger
 * /reportes:
 *   get:
 *     summary: Obtener todos los reportes
 *     tags: [reportes]
 *     responses:
 *       200:
 *         description: Lista de reportes
 *       500:
 *         description: Error al obtener los reportes
 */
export async function listReportes(_req: Request, res: Response) {
  try {
    const reportes = await db.select().from(reportesTable);
    res.status(200).json(reportes);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los reportes' });
  }
}

/**
 * @swagger
 * /reportes/{id}:
 *   get:
 *     summary: Obtener un reporte por ID
 *     tags: [reportes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del reporte
 *     responses:
 *       200:
 *         description: Reporte encontrado
 *       404:
 *         description: Reporte no encontrado
 *       500:
 *         description: Error al obtener el reporte
 */
export async function getReporte(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [reporte] = await db.select().from(reportesTable).where(eq(reportesTable.id, id));
    if (!reporte) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }
    res.status(200).json(reporte);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el reporte' });
  }
}

/**
 * @swagger
 * /reportes/{id}:
 *   put:
 *     summary: Actualizar un reporte por ID
 *     tags: [reportes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del reporte
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reportante_id:
 *                 type: integer
 *               usuario_reportado_id:
 *                 type: integer
 *               tipo_contenido:
 *                 type: string
 *               contenido_id:
 *                 type: integer
 *               motivo:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reporte actualizado correctamente
 *       404:
 *         description: Reporte no encontrado
 *       500:
 *         description: Error al actualizar el reporte
 */
export async function updateReporte(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updatedReporte] = await db
      .update(reportesTable)
      .set(req.cleanBody)
      .where(eq(reportesTable.id, id))
      .returning();
    if (!updatedReporte) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }
    res.status(200).json(updatedReporte);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el reporte' });
  }
}

/**
 * @swagger
 * /reportes/{id}:
 *   delete:
 *     summary: Eliminar un reporte por ID
 *     tags: [reportes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del reporte
 *     responses:
 *       200:
 *         description: Reporte eliminado correctamente
 *       404:
 *         description: Reporte no encontrado
 *       500:
 *         description: Error al eliminar el reporte
 */
export async function deleteReporte(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db.delete(reportesTable).where(eq(reportesTable.id, id)).returning();
    if (!deleted) {
      return res.status(404).json({ error: 'Reporte no encontrado' });
    }
    res.status(200).json({ message: 'Reporte eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el reporte' });
  }
}
