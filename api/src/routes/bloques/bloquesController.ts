// src/routes/bloquesController.ts
import { Request, Response, NextFunction } from 'express';
import { db } from '../../db';
import { bloquesTable } from '../../db/bloquesSchema';
import { eq, or } from 'drizzle-orm';
import { versionesBloquesTable } from '../../db/versionesBloquesSchema';
import { relacionesBloquesTable } from '../../db/relacionesBloquesSchema';

/**
 * @swagger
 * /bloques:
 *   post:
 *     summary: Crear un nuevo bloque
 *     tags: [bloques]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *               autor_id:
 *                 type: integer
 *               creado_en:
 *                 type: string
 *                 format: date-time
 *     responses:
 *       201:
 *         description: Bloque creado exitosamente
 *       500:
 *         description: Error al crear bloque
 */
const getUserId = (req: Request) => req.userId;

// 1) Crear bloque
export async function createBloque(req: Request, res: Response, next: NextFunction) {
  try {
    const pageId = Number(req.params.pageId);
    const data = req.cleanBody;
    data.pagina_id = pageId;
    data.creado_por = getUserId(req);
    
    const [bloque] = await db.insert(bloquesTable).values(data).returning();
    
    res.status(201).json(bloque);
  } catch (e) {
    console.error(e);
    next(e);
  }
}

/**
 * @swagger
 * /bloques:
 *   get:
 *     summary: Obtener todos los bloques
 *     tags: [bloques]
 *     responses:
 *       200:
 *         description: Lista de bloques
 *       500:
 *         description: Error al obtener bloques
 */
// 2) Listar por página
export async function listBloquesByPage(req: Request, res: Response, next: NextFunction) {
  try {
    const pageId = Number(req.params.pageId);
    const bloques = await db
      .select()
      .from(bloquesTable)
      .where(eq(bloquesTable.pagina_id, pageId))
      .orderBy(bloquesTable.orden);

    res.json(bloques);
  } catch (err) {
    next(err);
  }
}

/**
 * @swagger
 * /bloques/{id}:
 *   get:
 *     summary: Obtener un bloque por ID
 *     tags: [bloques]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del bloque
 *     responses:
 *       200:
 *         description: Bloque encontrado
 *       404:
 *         description: Bloque no encontrado
 *       500:
 *         description: Error al obtener bloque
 */
export async function getBloque(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [bloque] = await db.select().from(bloquesTable).where(eq(bloquesTable.id, id));
    if (!bloque) {
      return res.status(404).json({ error: 'Bloque no encontrado' });
    }
    res.status(200).json(bloque);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener bloque' });
  }
}

/**
 * @swagger
 * /bloques/{id}:
 *   put:
 *     summary: Actualizar un bloque por ID
 *     tags: [bloques]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del bloque a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *     responses:
 *       200:
 *         description: Bloque actualizado
 *       404:
 *         description: Bloque no encontrado
 *       500:
 *         description: Error al actualizar bloque
 */
export async function updateBloque(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await db
      .update(bloquesTable)
      .set(req.cleanBody)
      .where(eq(bloquesTable.id, id))
      .returning();
    if (!updated) {
      return res.status(404).json({ error: 'Bloque no encontrado' });
    }
    res.status(200).json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar bloque' });
  }
}

/**
 * @swagger
 * /bloques/{id}:
 *   delete:
 *     summary: Eliminar un bloque por ID
 *     tags: [bloques]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del bloque a eliminar
 *     responses:
 *       200:
 *         description: Bloque eliminado correctamente
 *       404:
 *         description: Bloque no encontrado
 *       500:
 *         description: Error al eliminar bloque
 */
export async function deleteBloque(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(bloquesTable)
      .where(eq(bloquesTable.id, id))
      .returning();
    if (!deleted) {
      return res.status(404).json({ error: 'Bloque no encontrado' });
    }
    res.status(200).json({ message: 'Bloque eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar bloque' });
  }
}
