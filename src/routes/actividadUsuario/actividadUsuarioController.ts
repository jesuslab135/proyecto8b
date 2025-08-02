// src/routes/actividadUsuarioController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { actividadUsuarioTable } from '../../db/actividadUsuarioSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /actividad-usuario:
 *   post:
 *     summary: Crear nueva actividad de usuario
 *     tags: [ActividadUsuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario_id
 *               - tipo_actividad
 *               - objeto_id
 *               - contexto
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               tipo_actividad:
 *                 type: string
 *               objeto_id:
 *                 type: integer
 *               contexto:
 *                 type: string
 *     responses:
 *       201:
 *         description: Actividad creada
 *       500:
 *         description: Error al crear actividad
 */
export async function createActividadUsuario(req: Request, res: Response) {
  try {
    const { id, fecha, ...data } = req.cleanBody;
    const [nuevaActividad] = await db.insert(actividadUsuarioTable).values(data).returning();
    res.status(201).json(nuevaActividad);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear la actividad de usuario' });
  }
}

/**
 * @swagger
 * /actividad-usuario:
 *   get:
 *     summary: Obtener todas las actividades de usuario
 *     tags: [ActividadUsuario]
 *     responses:
 *       200:
 *         description: Lista de actividades
 *       500:
 *         description: Error al obtener actividades
 */
export async function listActividadUsuario(_req: Request, res: Response) {
  try {
    const actividades = await db.select().from(actividadUsuarioTable);
    res.status(200).json(actividades);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las actividades de usuario' });
  }
}

/**
 * @swagger
 * /actividad-usuario/{id}:
 *   get:
 *     summary: Obtener una actividad por ID
 *     tags: [ActividadUsuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Actividad encontrada
 *       404:
 *         description: Actividad no encontrada
 *       500:
 *         description: Error al obtener actividad
 */
export async function getActividadUsuario(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [actividad] = await db.select().from(actividadUsuarioTable).where(eq(actividadUsuarioTable.id, id));

    if (!actividad) {
      res.status(404).json({ error: 'Actividad de usuario no encontrada' });
    } else {
      res.status(200).json(actividad);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener la actividad de usuario' });
  }
}

/**
 * @swagger
 * /actividad-usuario/{id}:
 *   put:
 *     summary: Actualizar una actividad de usuario por ID
 *     tags: [ActividadUsuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               tipo_actividad:
 *                 type: string
 *               objeto_id:
 *                 type: integer
 *               contexto:
 *                 type: string
 *     responses:
 *       200:
 *         description: Actividad actualizada
 *       404:
 *         description: Actividad no encontrada
 *       500:
 *         description: Error al actualizar actividad
 */
export async function updateActividadUsuario(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [actualizada] = await db
      .update(actividadUsuarioTable)
      .set(req.cleanBody)
      .where(eq(actividadUsuarioTable.id, id))
      .returning();

    if (!actualizada) {
      res.status(404).json({ error: 'Actividad de usuario no encontrada' });
    } else {
      res.status(200).json(actualizada);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la actividad de usuario' });
  }
}

/**
 * @swagger
 * /actividad-usuario/{id}:
 *   delete:
 *     summary: Eliminar una actividad por ID
 *     tags: [ActividadUsuario]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Actividad eliminada correctamente
 *       404:
 *         description: Actividad no encontrada
 *       500:
 *         description: Error al eliminar actividad
 */
export async function deleteActividadUsuario(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [eliminada] = await db.delete(actividadUsuarioTable).where(eq(actividadUsuarioTable.id, id)).returning();

    if (!eliminada) {
      res.status(404).json({ error: 'Actividad de usuario no encontrada' });
    } else {
      res.status(200).json({ message: 'Actividad eliminada correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la actividad de usuario' });
  }
}
