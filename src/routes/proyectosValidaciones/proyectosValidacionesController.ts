// src/routes/proyectosValidaciones/proyectosValidacionesController.ts
import { Request, Response } from 'express';
import { db } from '../../db';
import { proyectosValidacionesTable } from '../../db/proyectosValidacionesSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /proyectos-validaciones:
 *   post:
 *     summary: Crear una nueva validación de proyecto
 *     tags: [proyectosValidaciones]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               proyecto_id:
 *                 type: integer
 *               admin_id:
 *                 type: integer
 *               comentarios:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       201:
 *         description: Validación creada exitosamente
 *       500:
 *         description: Error al crear la validación del proyecto
 */
export async function createProyectoValidacion(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nuevaValidacion] = await db.insert(proyectosValidacionesTable).values(data).returning();
    res.status(201).json(nuevaValidacion);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear la validación del proyecto' });
  }
}

/**
 * @swagger
 * /proyectos-validaciones:
 *   get:
 *     summary: Obtener todas las validaciones de proyectos
 *     tags: [proyectosValidaciones]
 *     responses:
 *       200:
 *         description: Lista de validaciones de proyectos
 *       500:
 *         description: Error al obtener las validaciones
 */
export async function listProyectosValidaciones(_req: Request, res: Response) {
  try {
    const validaciones = await db.select().from(proyectosValidacionesTable);
    res.status(200).json(validaciones);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las validaciones' });
  }
}

/**
 * @swagger
 * /proyectos-validaciones/{id}:
 *   get:
 *     summary: Obtener una validación de proyecto por ID
 *     tags: [proyectosValidaciones]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la validación
 *     responses:
 *       200:
 *         description: Validación encontrada
 *       404:
 *         description: Validación no encontrada
 *       500:
 *         description: Error al obtener la validación
 */
export async function getProyectoValidacion(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [validacion] = await db.select().from(proyectosValidacionesTable).where(eq(proyectosValidacionesTable.id, id));
    if (!validacion) {
      return res.status(404).json({ error: 'Validación no encontrada' });
    }
    res.status(200).json(validacion);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener la validación' });
  }
}

/**
 * @swagger
 * /proyectos-validaciones/{id}:
 *   put:
 *     summary: Actualizar una validación de proyecto
 *     tags: [proyectosValidaciones]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la validación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comentarios:
 *                 type: string
 *               estado:
 *                 type: string
 *     responses:
 *       200:
 *         description: Validación actualizada correctamente
 *       404:
 *         description: Validación no encontrada
 *       500:
 *         description: Error al actualizar la validación
 */
export async function updateProyectoValidacion(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await db
      .update(proyectosValidacionesTable)
      .set(req.cleanBody)
      .where(eq(proyectosValidacionesTable.id, id))
      .returning();
    if (!updated) {
      return res.status(404).json({ error: 'Validación no encontrada' });
    }
    res.status(200).json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la validación' });
  }
}

/**
 * @swagger
 * /proyectos-validaciones/{id}:
 *   delete:
 *     summary: Eliminar una validación de proyecto
 *     tags: [proyectosValidaciones]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la validación
 *     responses:
 *       200:
 *         description: Validación eliminada correctamente
 *       404:
 *         description: Validación no encontrada
 *       500:
 *         description: Error al eliminar la validación
 */
export async function deleteProyectoValidacion(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db.delete(proyectosValidacionesTable).where(eq(proyectosValidacionesTable.id, id)).returning();
    if (!deleted) {
      return res.status(404).json({ error: 'Validación no encontrada' });
    }
    res.status(200).json({ message: 'Validación eliminada correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la validación' });
  }
}
