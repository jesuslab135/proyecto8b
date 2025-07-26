// src/routes/report-evidences/reportEvidencesController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { reportEvidencesTable } from '../../db/reportEvidencesSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /report-evidences:
 *   post:
 *     summary: Crear una nueva evidencia de reporte
 *     tags: [reportEvidences]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reporte_id
 *               - evidence_url
 *             properties:
 *               reporte_id:
 *                 type: integer
 *               evidence_url:
 *                 type: string
 *               evidence_type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Evidencia de reporte creada exitosamente
 *       500:
 *         description: Error al crear la evidencia de reporte
 */
export async function createReportEvidence(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    const [newRecord] = await db.insert(reportEvidencesTable).values(data).returning();
    res.status(201).json(newRecord);
  } catch (e) {
    console.error('❌ Error en createReportEvidence:', e);
    res.status(500).json({ error: 'Error al crear la evidencia de reporte' });
  }
}

/**
 * @swagger
 * /report-evidences:
 *   get:
 *     summary: Obtener todas las evidencias de reporte
 *     tags: [reportEvidences]
 *     responses:
 *       200:
 *         description: Lista de evidencias de reporte
 *       500:
 *         description: Error al obtener las evidencias de reporte
 */
export async function listReportEvidences(req: Request, res: Response) {
  try {
    const records = await db.select().from(reportEvidencesTable);
    res.status(200).json(records);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las evidencias de reporte' });
  }
}

/**
 * @swagger
 * /report-evidences/{id}:
 *   get:
 *     summary: Obtener una evidencia de reporte por ID
 *     tags: [reportEvidences]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la evidencia de reporte
 *     responses:
 *       200:
 *         description: Evidencia de reporte encontrada
 *       404:
 *         description: Evidencia de reporte no encontrada
 *       500:
 *         description: Error al obtener la evidencia de reporte
 */
export async function getReportEvidence(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [record] = await db.select().from(reportEvidencesTable).where(eq(reportEvidencesTable.id, id));
    if (!record) {
      return res.status(404).json({ error: 'Evidencia de reporte no encontrada' });
    }
    res.status(200).json(record);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener la evidencia de reporte' });
  }
}

/**
 * @swagger
 * /report-evidences/{id}:
 *   put:
 *     summary: Actualizar una evidencia de reporte por ID
 *     tags: [reportEvidences]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la evidencia de reporte a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reporte_id:
 *                 type: integer
 *               evidence_url:
 *                 type: string
 *               evidence_type:
 *                 type: string
 *     responses:
 *       200:
 *         description: Evidencia de reporte actualizada correctamente
 *       404:
 *         description: Evidencia de reporte no encontrada
 *       500:
 *         description: Error al actualizar la evidencia de reporte
 */
export async function updateReportEvidence(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const data = req.cleanBody;
    const [updatedRecord] = await db.update(reportEvidencesTable).set(data).where(eq(reportEvidencesTable.id, id)).returning();
    if (!updatedRecord) {
      return res.status(404).json({ error: 'Evidencia de reporte no encontrada' });
    }
    res.status(200).json(updatedRecord);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la evidencia de reporte' });
  }
}

/**
 * @swagger
 * /report-evidences/{id}:
 *   delete:
 *     summary: Eliminar una evidencia de reporte por ID
 *     tags: [reportEvidences]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la evidencia de reporte a eliminar
 *     responses:
 *       200:
 *         description: Evidencia de reporte eliminada correctamente
 *       404:
 *         description: Evidencia de reporte no encontrada
 *       500:
 *         description: Error al eliminar la evidencia de reporte
 */
export async function deleteReportEvidence(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deletedRecord] = await db.delete(reportEvidencesTable).where(eq(reportEvidencesTable.id, id)).returning();
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Evidencia de reporte no encontrada' });
    }
    res.status(200).json({ message: 'Evidencia de reporte eliminada correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la evidencia de reporte' });
  }
}
