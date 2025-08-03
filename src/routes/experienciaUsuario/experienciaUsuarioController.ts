// src/routes/experiencia-usuario/experienciaUsuarioController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { experienciaUsuarioTable } from '../../db/experienciaUsuarioSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /experiencia-usuario:
 *   post:
 *     summary: Crear una experiencia de usuario
 *     tags: [experienciaUsuario]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario_id
 *               - tipo
 *               - titulo
 *               - descripcion
 *               - fecha_inicio
 *               - fecha_fin
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               tipo:
 *                 type: string
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Experiencia creada
 *       500:
 *         description: Error al crear experiencia
 */
export async function createExperiencia(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    data.fecha_inicio = new Date(data.fecha_inicio);
    data.fecha_fin = new Date(data.fecha_fin);
    const [newExp] = await db.insert(experienciaUsuarioTable).values(data).returning();
    res.status(201).json(newExp);
  } catch (e) {
    console.error('❌ Error en createEvento:', e);
    res.status(500).json({ error: 'Error al crear experiencia' });
  }
}

/**
 * @swagger
 * /experiencia-usuario:
 *   get:
 *     summary: Obtener todas las experiencias de usuario
 *     tags: [experienciaUsuario]
 *     responses:
 *       200:
 *         description: Lista de experiencias
 *       500:
 *         description: Error al obtener experiencias
 */
export async function listExperiencias(_req: Request, res: Response) {
  try {
    const experiencias = await db.select().from(experienciaUsuarioTable);
    res.status(200).json(experiencias);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener experiencias' });
  }
}

/**
 * @swagger
 * /experiencia-usuario/{id}:
 *   get:
 *     summary: Obtener una experiencia por ID
 *     tags: [experienciaUsuario]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la experiencia
 *     responses:
 *       200:
 *         description: Experiencia encontrada
 *       404:
 *         description: Experiencia no encontrada
 *       500:
 *         description: Error al obtener experiencia
 */
export async function getExperiencia(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [exp] = await db.select().from(experienciaUsuarioTable).where(eq(experienciaUsuarioTable.id, id));
    if (!exp) return res.status(404).json({ error: 'Experiencia no encontrada' });
    res.status(200).json(exp);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener experiencia' });
  }
}

/**
 * @swagger
 * /experiencia-usuario/{id}:
 *   put:
 *     summary: Actualizar una experiencia de usuario por ID
 *     tags: [experienciaUsuario]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la experiencia a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               tipo:
 *                 type: string
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               fecha_inicio:
 *                 type: string
 *                 format: date
 *               fecha_fin:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Experiencia actualizada
 *       404:
 *         description: Experiencia no encontrada
 *       500:
 *         description: Error al actualizar experiencia
 */
export async function updateExperiencia(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const data = req.cleanBody;

    if (data.fecha_inicio) data.fecha_inicio = new Date(data.fecha_inicio);
    if (data.fecha_fin) data.fecha_fin = new Date(data.fecha_fin);

    const [updated] = await db
      .update(experienciaUsuarioTable)
      .set(data)
      .where(eq(experienciaUsuarioTable.id, id))
      .returning();

    if (!updated) return res.status(404).json({ error: 'Experiencia no encontrada' });
    res.status(200).json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar experiencia' });
  }
}

/**
 * @swagger
 * /experiencia-usuario/{id}:
 *   delete:
 *     summary: Eliminar una experiencia por ID
 *     tags: [experienciaUsuario]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la experiencia a eliminar
 *     responses:
 *       200:
 *         description: Experiencia eliminada correctamente
 *       404:
 *         description: Experiencia no encontrada
 *       500:
 *         description: Error al eliminar experiencia
 */
export async function deleteExperiencia(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(experienciaUsuarioTable)
      .where(eq(experienciaUsuarioTable.id, id))
      .returning();

    if (!deleted) return res.status(404).json({ error: 'Experiencia no encontrada' });
    res.status(200).json({ message: 'Experiencia eliminada correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar experiencia' });
  }
}
