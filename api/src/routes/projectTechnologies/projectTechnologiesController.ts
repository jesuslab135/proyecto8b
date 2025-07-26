// src/routes/project-technologies/projectTechnologiesController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { projectTechnologiesTable } from '../../db/projectTechnologiesSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /project-technologies:
 *   post:
 *     summary: Crear una nueva tecnología de proyecto
 *     tags: [projectTechnologies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - proyecto_id
 *               - technology_name
 *             properties:
 *               proyecto_id:
 *                 type: integer
 *               technology_name:
 *                 type: string
 *               proficiency_level:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Tecnología de proyecto creada exitosamente
 *       500:
 *         description: Error al crear la tecnología de proyecto
 */
export async function createProjectTechnology(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    const [newRecord] = await db.insert(projectTechnologiesTable).values(data).returning();
    res.status(201).json(newRecord);
  } catch (e) {
    console.error('❌ Error en createProjectTechnology:', e);
    res.status(500).json({ error: 'Error al crear la tecnología de proyecto' });
  }
}

/**
 * @swagger
 * /project-technologies:
 *   get:
 *     summary: Obtener todas las tecnologías de proyecto
 *     tags: [projectTechnologies]
 *     responses:
 *       200:
 *         description: Lista de tecnologías de proyecto
 *       500:
 *         description: Error al obtener las tecnologías de proyecto
 */
export async function listProjectTechnologies(req: Request, res: Response) {
  try {
    const records = await db.select().from(projectTechnologiesTable);
    res.status(200).json(records);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las tecnologías de proyecto' });
  }
}

/**
 * @swagger
 * /project-technologies/{id}:
 *   get:
 *     summary: Obtener una tecnología de proyecto por ID
 *     tags: [projectTechnologies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tecnología de proyecto
 *     responses:
 *       200:
 *         description: Tecnología de proyecto encontrada
 *       404:
 *         description: Tecnología de proyecto no encontrada
 *       500:
 *         description: Error al obtener la tecnología de proyecto
 */
export async function getProjectTechnology(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [record] = await db.select().from(projectTechnologiesTable).where(eq(projectTechnologiesTable.id, id));
    if (!record) {
      return res.status(404).json({ error: 'Tecnología de proyecto no encontrada' });
    }
    res.status(200).json(record);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener la tecnología de proyecto' });
  }
}

/**
 * @swagger
 * /project-technologies/{id}:
 *   put:
 *     summary: Actualizar una tecnología de proyecto por ID
 *     tags: [projectTechnologies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tecnología de proyecto a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               proyecto_id:
 *                 type: integer
 *               technology_name:
 *                 type: string
 *               proficiency_level:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Tecnología de proyecto actualizada correctamente
 *       404:
 *         description: Tecnología de proyecto no encontrada
 *       500:
 *         description: Error al actualizar la tecnología de proyecto
 */
export async function updateProjectTechnology(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const data = req.cleanBody;
    const [updatedRecord] = await db.update(projectTechnologiesTable).set(data).where(eq(projectTechnologiesTable.id, id)).returning();
    if (!updatedRecord) {
      return res.status(404).json({ error: 'Tecnología de proyecto no encontrada' });
    }
    res.status(200).json(updatedRecord);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la tecnología de proyecto' });
  }
}

/**
 * @swagger
 * /project-technologies/{id}:
 *   delete:
 *     summary: Eliminar una tecnología de proyecto por ID
 *     tags: [projectTechnologies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la tecnología de proyecto a eliminar
 *     responses:
 *       200:
 *         description: Tecnología de proyecto eliminada correctamente
 *       404:
 *         description: Tecnología de proyecto no encontrada
 *       500:
 *         description: Error al eliminar la tecnología de proyecto
 */
export async function deleteProjectTechnology(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deletedRecord] = await db.delete(projectTechnologiesTable).where(eq(projectTechnologiesTable.id, id)).returning();
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Tecnología de proyecto no encontrada' });
    }
    res.status(200).json({ message: 'Tecnología de proyecto eliminada correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la tecnología de proyecto' });
  }
}
