// src/routes/opportunity-types/opportunityTypesController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { opportunityTypesTable } from '../../db/opportunityTypesSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /opportunity-types:
 *   post:
 *     summary: Crear un nuevo tipo de oportunidad
 *     tags: [opportunityTypes]
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
 *         description: Tipo de oportunidad creado exitosamente
 *       500:
 *         description: Error al crear el tipo de oportunidad
 */
export async function createOpportunityType(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    const [newRecord] = await db.insert(opportunityTypesTable).values(data).returning();
    res.status(201).json(newRecord);
  } catch (e) {
    console.error('❌ Error en createOpportunityType:', e);
    res.status(500).json({ error: 'Error al crear el tipo de oportunidad' });
  }
}

/**
 * @swagger
 * /opportunity-types:
 *   get:
 *     summary: Obtener todos los tipos de oportunidad
 *     tags: [opportunityTypes]
 *     responses:
 *       200:
 *         description: Lista de tipos de oportunidad
 *       500:
 *         description: Error al obtener los tipos de oportunidad
 */
export async function listOpportunityTypes(req: Request, res: Response) {
  try {
    const records = await db.select().from(opportunityTypesTable);
    res.status(200).json(records);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los tipos de oportunidad' });
  }
}

/**
 * @swagger
 * /opportunity-types/{id}:
 *   get:
 *     summary: Obtener un tipo de oportunidad por ID
 *     tags: [opportunityTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de oportunidad
 *     responses:
 *       200:
 *         description: Tipo de oportunidad encontrado
 *       404:
 *         description: Tipo de oportunidad no encontrado
 *       500:
 *         description: Error al obtener el tipo de oportunidad
 */
export async function getOpportunityType(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [record] = await db.select().from(opportunityTypesTable).where(eq(opportunityTypesTable.id, id));
    if (!record) {
      return res.status(404).json({ error: 'Tipo de oportunidad no encontrado' });
    }
    res.status(200).json(record);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el tipo de oportunidad' });
  }
}

/**
 * @swagger
 * /opportunity-types/{id}:
 *   put:
 *     summary: Actualizar un tipo de oportunidad por ID
 *     tags: [opportunityTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de oportunidad a actualizar
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
 *         description: Tipo de oportunidad actualizado correctamente
 *       404:
 *         description: Tipo de oportunidad no encontrado
 *       500:
 *         description: Error al actualizar el tipo de oportunidad
 */
export async function updateOpportunityType(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const data = req.cleanBody;
    const [updatedRecord] = await db.update(opportunityTypesTable).set(data).where(eq(opportunityTypesTable.id, id)).returning();
    if (!updatedRecord) {
      return res.status(404).json({ error: 'Tipo de oportunidad no encontrado' });
    }
    res.status(200).json(updatedRecord);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el tipo de oportunidad' });
  }
}

/**
 * @swagger
 * /opportunity-types/{id}:
 *   delete:
 *     summary: Eliminar un tipo de oportunidad por ID
 *     tags: [opportunityTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de oportunidad a eliminar
 *     responses:
 *       200:
 *         description: Tipo de oportunidad eliminado correctamente
 *       404:
 *         description: Tipo de oportunidad no encontrado
 *       500:
 *         description: Error al eliminar el tipo de oportunidad
 */
export async function deleteOpportunityType(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deletedRecord] = await db.delete(opportunityTypesTable).where(eq(opportunityTypesTable.id, id)).returning();
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Tipo de oportunidad no encontrado' });
    }
    res.status(200).json({ message: 'Tipo de oportunidad eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el tipo de oportunidad' });
  }
}
