// src/routes/user-skills/userSkillsController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { userSkillsTable } from '../../db/userSkillsSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /user-skills:
 *   post:
 *     summary: Crear una nueva habilidad de usuario
 *     tags: [userSkills]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - usuario_id
 *               - skill_name
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               skill_name:
 *                 type: string
 *               proficiency_level:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Habilidad de usuario creada exitosamente
 *       500:
 *         description: Error al crear la habilidad de usuario
 */
export async function createUserSkill(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    const [newRecord] = await db.insert(userSkillsTable).values(data).returning();
    res.status(201).json(newRecord);
  } catch (e) {
    console.error('❌ Error en createUserSkill:', e);
    res.status(500).json({ error: 'Error al crear la habilidad de usuario' });
  }
}

/**
 * @swagger
 * /user-skills:
 *   get:
 *     summary: Obtener todas las habilidades de usuario
 *     tags: [userSkills]
 *     responses:
 *       200:
 *         description: Lista de habilidades de usuario
 *       500:
 *         description: Error al obtener las habilidades de usuario
 */
export async function listUserSkills(req: Request, res: Response) {
  try {
    const records = await db.select().from(userSkillsTable);
    res.status(200).json(records);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las habilidades de usuario' });
  }
}

/**
 * @swagger
 * /user-skills/{id}:
 *   get:
 *     summary: Obtener una habilidad de usuario por ID
 *     tags: [userSkills]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la habilidad de usuario
 *     responses:
 *       200:
 *         description: Habilidad de usuario encontrada
 *       404:
 *         description: Habilidad de usuario no encontrada
 *       500:
 *         description: Error al obtener la habilidad de usuario
 */
export async function getUserSkill(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [record] = await db.select().from(userSkillsTable).where(eq(userSkillsTable.id, id));
    if (!record) {
      return res.status(404).json({ error: 'Habilidad de usuario no encontrada' });
    }
    res.status(200).json(record);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener la habilidad de usuario' });
  }
}

/**
 * @swagger
 * /user-skills/{id}:
 *   put:
 *     summary: Actualizar una habilidad de usuario por ID
 *     tags: [userSkills]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la habilidad de usuario a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usuario_id:
 *                 type: integer
 *               skill_name:
 *                 type: string
 *               proficiency_level:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Habilidad de usuario actualizada correctamente
 *       404:
 *         description: Habilidad de usuario no encontrada
 *       500:
 *         description: Error al actualizar la habilidad de usuario
 */
export async function updateUserSkill(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const data = req.cleanBody;
    const [updatedRecord] = await db.update(userSkillsTable).set(data).where(eq(userSkillsTable.id, id)).returning();
    if (!updatedRecord) {
      return res.status(404).json({ error: 'Habilidad de usuario no encontrada' });
    }
    res.status(200).json(updatedRecord);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la habilidad de usuario' });
  }
}

/**
 * @swagger
 * /user-skills/{id}:
 *   delete:
 *     summary: Eliminar una habilidad de usuario por ID
 *     tags: [userSkills]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la habilidad de usuario a eliminar
 *     responses:
 *       200:
 *         description: Habilidad de usuario eliminada correctamente
 *       404:
 *         description: Habilidad de usuario no encontrada
 *       500:
 *         description: Error al eliminar la habilidad de usuario
 */
export async function deleteUserSkill(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deletedRecord] = await db.delete(userSkillsTable).where(eq(userSkillsTable.id, id)).returning();
    if (!deletedRecord) {
      return res.status(404).json({ error: 'Habilidad de usuario no encontrada' });
    }
    res.status(200).json({ message: 'Habilidad de usuario eliminada correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la habilidad de usuario' });
  }
}
