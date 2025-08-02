// src/routes/event-types/eventTypesController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { eventTypesTable } from '../../db/eventTypesSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /event-types:
 *   post:
 *     summary: Crear un nuevo tipo de evento
 *     tags: [eventTypes]
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
 *               icon:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Tipo de evento creado exitosamente
 *       500:
 *         description: Error al crear el tipo de evento
 */
export async function createEventType(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    const [newRecord] = await db.insert(eventTypesTable).values(data).returning();
    res.status(201).json(newRecord);
  } catch (e) {
    console.error('❌ Error en createEventType:', e);
    res.status(500).json({ error: 'Error al crear el tipo de evento' });
  }
}

/**
 * @swagger
 * /event-types:
 *   get:
 *     summary: Obtener todos los tipos de evento
 *     tags: [eventTypes]
 *     responses:
 *       200:
 *         description: Lista de tipos de evento
 *       500:
 *         description: Error al obtener los tipos de evento
 */
export async function listEventTypes(req: Request, res: Response) {
  try {
    const records = await db.select().from(eventTypesTable);
    res.status(200).json(records);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los tipos de evento' });
  }
}

/**
 * @swagger
 * /event-types/{id}:
 *   get:
 *     summary: Obtener un tipo de evento por ID
 *     tags: [eventTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de evento
 *     responses:
 *       200:
 *         description: Tipo de evento encontrado
 *       404:
 *         description: Tipo de evento no encontrado
 *       500:
 *         description: Error al obtener el tipo de evento
 */
export async function getEventType(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [record] = await db.select().from(eventTypesTable).where(eq(eventTypesTable.id, id));
    if (!record) {
      return res.status(404).json({ error: 'Tipo de evento no encontrado' });
    }
    res.status(200).json(record);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el tipo de evento' });
  }
}

/**
 * @swagger
 * /event-types/{id}:
 *   put:
 *     summary: Actualizar un tipo de evento por ID
 *     tags: [eventTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de evento a actualizar
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
 *               icon:
 *                 type: string
 *               is_active:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Tipo de evento actualizado correctamente
 *       404:
 *         description: Tipo de evento no encontrado
 *       500:
 *         description: Error al actualizar el tipo de evento
 */
export async function updateEventType(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const data = req.cleanBody;
    const [updatedRecord] = await db.update(eventTypesTable).set(data).where(eq(eventTypesTable.id, id)).returning();
    if (!updatedRecord) {
      return res.status(404).json({ error: 'Tipo de evento no encontrado' });
    }
    res.status(200).json(updatedRecord);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el tipo de evento' });
  }
}

/**
 * @swagger
 * /event-types/{id}:
 *   delete:
 *     summary: Eliminar un tipo de evento por ID
 *     tags: [eventTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de evento a eliminar
 *     responses:
 *       200:
 *         description: Tipo de evento eliminado correctamente
 *       404:
 *         description: Tipo de evento no encontrado
 *       500:
 *         description: Error al eliminar el tipo de evento
 */
export async function deleteEventType(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deletedRecord] = await db.delete(eventTypesTable).where(eq(eventTypesTable.id, id)).returning();
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Tipo de evento no encontrado' });
    }
    res.status(200).json({ message: 'Tipo de evento eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el tipo de evento' });
  }
}
