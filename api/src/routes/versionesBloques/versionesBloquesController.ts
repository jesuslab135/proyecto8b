import { Request, Response } from 'express';
import { db } from '../../db';
import { versionesBloquesTable } from '../../db/versionesBloquesSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * tags:
 *   name: versionesBloques
 *   description: Endpoints para gestionar versiones de bloques
 */

/**
 * @swagger
 * /versiones-bloques:
 *   post:
 *     summary: Crear una nueva versión de bloque
 *     tags: [versionesBloques]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               bloque_id:
 *                 type: integer
 *               contenido:
 *                 type: string
 *     responses:
 *       201:
 *         description: Versión creada correctamente
 *       500:
 *         description: Error al crear versión
 */
export async function createVersionBloque(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nueva] = await db.insert(versionesBloquesTable).values(data).returning();
    res.status(201).json(nueva);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear versión del bloque' });
  }
}

/**
 * @swagger
 * /versiones-bloques:
 *   get:
 *     summary: Listar todas las versiones de bloques
 *     tags: [versionesBloques]
 *     responses:
 *       200:
 *         description: Lista de versiones obtenida
 *       500:
 *         description: Error al obtener versiones
 */
export async function listVersionesBloques(_req: Request, res: Response) {
  try {
    const versiones = await db.select().from(versionesBloquesTable);
    res.status(200).json(versiones);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener versiones' });
  }
}

/**
 * @swagger
 * /versiones-bloques/{id}:
 *   get:
 *     summary: Obtener una versión por ID
 *     tags: [versionesBloques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la versión
 *     responses:
 *       200:
 *         description: Versión encontrada
 *       404:
 *         description: Versión no encontrada
 *       500:
 *         description: Error al obtener versión
 */
export async function getVersionBloque(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [version] = await db
      .select()
      .from(versionesBloquesTable)
      .where(eq(versionesBloquesTable.id, id));

    if (!version) {
      return res.status(404).json({ error: 'Versión no encontrada' });
    }

    res.status(200).json(version);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener versión del bloque' });
  }
}

/**
 * @swagger
 * /versiones-bloques/{id}:
 *   put:
 *     summary: Actualizar una versión existente
 *     tags: [versionesBloques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la versión a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenido:
 *                 type: string
 *     responses:
 *       200:
 *         description: Versión actualizada correctamente
 *       404:
 *         description: Versión no encontrada
 *       500:
 *         description: Error al actualizar versión
 */
export async function updateVersionBloque(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await db
      .update(versionesBloquesTable)
      .set(req.cleanBody)
      .where(eq(versionesBloquesTable.id, id))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: 'Versión no encontrada' });
    }

    res.status(200).json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar versión' });
  }
}

/**
 * @swagger
 * /versiones-bloques/{id}:
 *   delete:
 *     summary: Eliminar una versión por ID
 *     tags: [versionesBloques]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la versión a eliminar
 *     responses:
 *       200:
 *         description: Versión eliminada correctamente
 *       404:
 *         description: Versión no encontrada
 *       500:
 *         description: Error al eliminar versión
 */
export async function deleteVersionBloque(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(versionesBloquesTable)
      .where(eq(versionesBloquesTable.id, id))
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: 'Versión no encontrada' });
    }

    res.status(200).json({ message: 'Versión eliminada correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar versión' });
  }
}
