// src/routes/work-modalities/workModalitiesController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { workModalitiesTable } from '../../db/workModalitiesSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /work-modalities:
 *   post:
 *     summary: Crear un nuevo modalidad de trabajo
 *     tags: [workModalities]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Modalidad de trabajo creado exitosamente
 *       500:
 *         description: Error al crear la modalidad de trabajo
 */
export async function createWorkModality(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    const [newRecord] = await db.insert(workModalitiesTable).values(data).returning();
    res.status(201).json(newRecord);
  } catch (e) {
    console.error('❌ Error en createWorkModality:', e);
    res.status(500).json({ error: 'Error al crear la modalidad de trabajo' });
  }
}

/**
 * @swagger
 * /work-modalities:
 *   get:
 *     summary: Obtener todas las modalidades de trabajo
 *     tags: [workModalities]
 *     responses:
 *       200:
 *         description: Lista de modalidades de trabajo
 *       500:
 *         description: Error al obtener las modalidades de trabajo
 */
export async function listWorkModalities(req: Request, res: Response) {
  try {
    const records = await db.select().from(workModalitiesTable);
    res.status(200).json(records);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las modalidades de trabajo' });
  }
}

/**
 * @swagger
 * /work-modalities/{id}:
 *   get:
 *     summary: Obtener un modalidad de trabajo por ID
 *     tags: [workModalities]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del modalidad de trabajo
 *     responses:
 *       200:
 *         description: Modalidad de trabajo encontrado
 *       404:
 *         description: Modalidad de trabajo no encontrado
 *       500:
 *         description: Error al obtener la modalidad de trabajo
 */
export async function getWorkModality(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [record] = await db.select().from(workModalitiesTable).where(eq(workModalitiesTable.id, id));
    if (!record) {
      return res.status(404).json({ error: 'Modalidad de trabajo no encontrada' });
    }
    res.status(200).json(record);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener la modalidad de trabajo' });
  }
}

/**
 * @swagger
 * /work-modalities/{id}:
 *   put:
 *     summary: Actualizar un modalidad de trabajo por ID
 *     tags: [workModalities]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del modalidad de trabajo a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Modalidad de trabajo actualizado correctamente
 *       404:
 *         description: Modalidad de trabajo no encontrado
 *       500:
 *         description: Error al actualizar la modalidad de trabajo
 */
export async function updateWorkModality(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const data = req.cleanBody;
    const [updatedRecord] = await db.update(workModalitiesTable).set(data).where(eq(workModalitiesTable.id, id)).returning();
    if (!updatedRecord) {
      return res.status(404).json({ error: 'Modalidad de trabajo no encontrada' });
    }
    res.status(200).json(updatedRecord);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la modalidad de trabajo' });
  }
}

/**
 * @swagger
 * /work-modalities/{id}:
 *   delete:
 *     summary: Eliminar un modalidad de trabajo por ID
 *     tags: [workModalities]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del modalidad de trabajo a eliminar
 *     responses:
 *       200:
 *         description: Modalidad de trabajo eliminada correctamente
 *       404:
 *         description: Modalidad de trabajo no encontrada
 *       500:
 *         description: Error al eliminar la modalidad de trabajo
 */
export async function deleteWorkModality(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deletedRecord] = await db.delete(workModalitiesTable).where(eq(workModalitiesTable.id, id)).returning();
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Modalidad de trabajo no encontrada' });
    }
    res.status(200).json({ message: 'Modalidad de trabajo eliminada correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la modalidad de trabajo' });
  }
}
