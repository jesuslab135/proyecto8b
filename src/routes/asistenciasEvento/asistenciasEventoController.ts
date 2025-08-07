// src/routes/asistenciasEventoController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { asistenciasEventoTable } from '../../db/asistenciasEventoSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /asistencias-eventos:
 *   post:
 *     summary: Registrar asistencia a evento
 *     tags: [asistenciasEvento]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario_id
 *               - evento_id
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               evento_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Asistencia registrada exitosamente
 *       500:
 *         description: Error al registrar asistencia
 */
export async function createAsistenciaEvento(req: Request, res: Response) {
  try {
    const {id, ...data} = req.cleanBody;
    const [nuevaAsistencia] = await db.insert(asistenciasEventoTable).values(data).returning();
    res.status(201).json(nuevaAsistencia);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al registrar asistencia' });
  }
}

/**
 * @swagger
 * /asistencias-eventos:
 *   get:
 *     summary: Obtener todas las asistencias registradas
 *     tags: [asistenciasEvento]
 *     responses:
 *       200:
 *         description: Lista de asistencias
 *       500:
 *         description: Error al obtener asistencias
 */
export async function listAsistenciasEvento(_req: Request, res: Response) {
  try {
    const asistencias = await db.select().from(asistenciasEventoTable);
    res.status(200).json(asistencias);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener asistencias' });
  }
}

/**
 * @swagger
 * /asistencias-eventos/{id}:
 *   get:
 *     summary: Obtener asistencia por ID
 *     tags: [asistenciasEvento]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID de la asistencia
 *     responses:
 *       200:
 *         description: Asistencia encontrada
 *       404:
 *         description: Asistencia no encontrada
 *       500:
 *         description: Error al obtener asistencia
 */
export async function getAsistenciaEvento(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [asistencia] = await db
      .select()
      .from(asistenciasEventoTable)
      .where(eq(asistenciasEventoTable.id, id));

    if (!asistencia) {
      res.status(404).json({ error: 'Asistencia no encontrada' });
    } else {
      res.status(200).json(asistencia);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener asistencia' });
  }
}

/**
 * @swagger
 * /asistencias-eventos/{id}:
 *   put:
 *     summary: Actualizar asistencia por ID
 *     tags: [asistenciasEvento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asistencia
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               evento_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Asistencia actualizada
 *       404:
 *         description: Asistencia no encontrada
 *       500:
 *         description: Error al actualizar asistencia
 */
export async function updateAsistenciaEvento(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [actualizada] = await db
      .update(asistenciasEventoTable)
      .set(req.cleanBody)
      .where(eq(asistenciasEventoTable.id, id))
      .returning();

    if (!actualizada) {
      res.status(404).json({ error: 'Asistencia no encontrada' });
    } else {
      res.status(200).json(actualizada);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar asistencia' });
  }
}

/**
 * @swagger
 * /asistencias-eventos/{id}:
 *   delete:
 *     summary: Eliminar asistencia por ID
 *     tags: [asistenciasEvento]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la asistencia
 *     responses:
 *       200:
 *         description: Asistencia eliminada correctamente
 *       404:
 *         description: Asistencia no encontrada
 *       500:
 *         description: Error al eliminar asistencia
 */
export async function deleteAsistenciaEvento(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [eliminada] = await db
      .delete(asistenciasEventoTable)
      .where(eq(asistenciasEventoTable.id, id))
      .returning();

    if (!eliminada) {
      res.status(404).json({ error: 'Asistencia no encontrada' });
    } else {
      res.status(200).json({ message: 'Asistencia eliminada correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar asistencia' });
  }
}
