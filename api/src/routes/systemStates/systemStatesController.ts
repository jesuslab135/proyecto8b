// src/routes/system-states/systemStatesController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { systemStatesTable } from '../../db/systemStatesSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /system-states:
 *   post:
 *     summary: Crear un nuevo estado del sistema
 *     tags: [systemStates]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - entity_type
 *               - code
 *               - name
 *             properties:
 *               entity_type:
 *                 type: string
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               color:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               sort_order:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Estado del sistema creado exitosamente
 *       500:
 *         description: Error al crear el estado del sistema
 */
export async function createSystemState(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    const [newRecord] = await db.insert(systemStatesTable).values(data).returning();
    res.status(201).json(newRecord);
  } catch (e) {
    console.error('❌ Error en createSystemState:', e);
    res.status(500).json({ error: 'Error al crear el estado del sistema' });
  }
}

/**
 * @swagger
 * /system-states:
 *   get:
 *     summary: Obtener todos los estados del sistema
 *     tags: [systemStates]
 *     responses:
 *       200:
 *         description: Lista de estados del sistema
 *       500:
 *         description: Error al obtener los estados del sistema
 */
export async function listSystemStates(req: Request, res: Response) {
  try {
    const records = await db.select().from(systemStatesTable);
    res.status(200).json(records);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los estados del sistema' });
  }
}

/**
 * @swagger
 * /system-states/{id}:
 *   get:
 *     summary: Obtener un estado del sistema por ID
 *     tags: [systemStates]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estado del sistema
 *     responses:
 *       200:
 *         description: Estado del sistema encontrado
 *       404:
 *         description: Estado del sistema no encontrado
 *       500:
 *         description: Error al obtener el estado del sistema
 */
export async function getSystemState(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [record] = await db.select().from(systemStatesTable).where(eq(systemStatesTable.id, id));
    if (!record) {
      return res.status(404).json({ error: 'Estado del sistema no encontrado' });
    }
    res.status(200).json(record);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el estado del sistema' });
  }
}

/**
 * @swagger
 * /system-states/{id}:
 *   put:
 *     summary: Actualizar un estado del sistema por ID
 *     tags: [systemStates]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estado del sistema a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               entity_type:
 *                 type: string
 *               code:
 *                 type: string
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               color:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *               sort_order:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Estado del sistema actualizado correctamente
 *       404:
 *         description: Estado del sistema no encontrado
 *       500:
 *         description: Error al actualizar el estado del sistema
 */
export async function updateSystemState(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const data = req.cleanBody;
    const [updatedRecord] = await db.update(systemStatesTable).set(data).where(eq(systemStatesTable.id, id)).returning();
    if (!updatedRecord) {
      return res.status(404).json({ error: 'Estado del sistema no encontrado' });
    }
    res.status(200).json(updatedRecord);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el estado del sistema' });
  }
}

/**
 * @swagger
 * /system-states/{id}:
 *   delete:
 *     summary: Eliminar un estado del sistema por ID
 *     tags: [systemStates]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del estado del sistema a eliminar
 *     responses:
 *       200:
 *         description: Estado del sistema eliminado correctamente
 *       404:
 *         description: Estado del sistema no encontrado
 *       500:
 *         description: Error al eliminar el estado del sistema
 */
export async function deleteSystemState(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deletedRecord] = await db.delete(systemStatesTable).where(eq(systemStatesTable.id, id)).returning();
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Estado del sistema no encontrado' });
    }
    res.status(200).json({ message: 'Estado del sistema eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el estado del sistema' });
  }
}
