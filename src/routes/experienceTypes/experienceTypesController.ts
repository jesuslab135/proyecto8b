// src/routes/experience-types/experienceTypesController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { experienceTypesTable } from '../../db/experienceTypesSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /experience-types:
 *   post:
 *     summary: Crear un nuevo tipo de experiencia
 *     tags: [experienceTypes]
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
 *         description: Tipo de experiencia creado exitosamente
 *       500:
 *         description: Error al crear el tipo de experiencia
 */
export async function createExperienceType(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    const [newRecord] = await db.insert(experienceTypesTable).values(data).returning();
    res.status(201).json(newRecord);
  } catch (e) {
    console.error('❌ Error en createExperienceType:', e);
    res.status(500).json({ error: 'Error al crear el tipo de experiencia' });
  }
}

/**
 * @swagger
 * /experience-types:
 *   get:
 *     summary: Obtener todos los tipos de experiencia
 *     tags: [experienceTypes]
 *     responses:
 *       200:
 *         description: Lista de tipos de experiencia
 *       500:
 *         description: Error al obtener los tipos de experiencia
 */
export async function listExperienceTypes(req: Request, res: Response) {
  try {
    const records = await db.select().from(experienceTypesTable);
    res.status(200).json(records);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los tipos de experiencia' });
  }
}

/**
 * @swagger
 * /experience-types/{id}:
 *   get:
 *     summary: Obtener un tipo de experiencia por ID
 *     tags: [experienceTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de experiencia
 *     responses:
 *       200:
 *         description: Tipo de experiencia encontrado
 *       404:
 *         description: Tipo de experiencia no encontrado
 *       500:
 *         description: Error al obtener el tipo de experiencia
 */
export async function getExperienceType(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [record] = await db.select().from(experienceTypesTable).where(eq(experienceTypesTable.id, id));
    if (!record) {
      return res.status(404).json({ error: 'Tipo de experiencia no encontrado' });
    }
    res.status(200).json(record);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el tipo de experiencia' });
  }
}

/**
 * @swagger
 * /experience-types/{id}:
 *   put:
 *     summary: Actualizar un tipo de experiencia por ID
 *     tags: [experienceTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de experiencia a actualizar
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
 *         description: Tipo de experiencia actualizado correctamente
 *       404:
 *         description: Tipo de experiencia no encontrado
 *       500:
 *         description: Error al actualizar el tipo de experiencia
 */
export async function updateExperienceType(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const data = req.cleanBody;
    const [updatedRecord] = await db.update(experienceTypesTable).set(data).where(eq(experienceTypesTable.id, id)).returning();
    if (!updatedRecord) {
      return res.status(404).json({ error: 'Tipo de experiencia no encontrado' });
    }
    res.status(200).json(updatedRecord);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el tipo de experiencia' });
  }
}

/**
 * @swagger
 * /experience-types/{id}:
 *   delete:
 *     summary: Eliminar un tipo de experiencia por ID
 *     tags: [experienceTypes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del tipo de experiencia a eliminar
 *     responses:
 *       200:
 *         description: Tipo de experiencia eliminado correctamente
 *       404:
 *         description: Tipo de experiencia no encontrado
 *       500:
 *         description: Error al eliminar el tipo de experiencia
 */
export async function deleteExperienceType(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deletedRecord] = await db.delete(experienceTypesTable).where(eq(experienceTypesTable.id, id)).returning();
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Tipo de experiencia no encontrado' });
    }
    res.status(200).json({ message: 'Tipo de experiencia eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el tipo de experiencia' });
  }
}
