import { Request, Response } from 'express';
import { db } from '../../db/index';
import { postulacioneslaboralesTable } from '../../db/postulacionesLaboralesSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /postulaciones-laborales:
 *   post:
 *     summary: Crear una nueva postulación laboral
 *     tags: [postulacionesLaborales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - oferta_id
 *               - usuario_id
 *             properties:
 *               oferta_id:
 *                 type: integer
 *               usuario_id:
 *                 type: integer
 *               cv_url:
 *                 type: string
 *     responses:
 *       201:
 *         description: Postulación laboral creada exitosamente
 *       500:
 *         description: Error al registrar una postulación
 */
export async function createPostulacionLaboral(req: Request, res: Response) {
  try {
    const { id, fecha, ...data } = req.cleanBody;
    const [nuevaPostulacion] = await db.insert(postulacioneslaboralesTable).values(data).returning();
    res.status(201).json(nuevaPostulacion);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al registrar una postulacion' });
  }
}

/**
 * @swagger
 * /postulaciones-laborales:
 *   get:
 *     summary: Obtener todas las postulaciones laborales
 *     tags: [postulacionesLaborales]
 *     responses:
 *       200:
 *         description: Lista de postulaciones laborales
 *       500:
 *         description: Error al obtener las postulaciones
 */
export async function listPostulacionLaboral(_req: Request, res: Response) {
  try {
    const postulacionLaboral = await db.select().from(postulacioneslaboralesTable);
    res.status(200).json(postulacionLaboral);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las postulaciones' });
  }
}

/**
 * @swagger
 * /postulaciones-laborales/{id}:
 *   get:
 *     summary: Obtener una postulación laboral por ID
 *     tags: [postulacionesLaborales]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la postulación laboral
 *     responses:
 *       200:
 *         description: Postulación encontrada
 *       404:
 *         description: Postulación no encontrada
 *       500:
 *         description: Error al obtener la postulación
 */
export async function getPostulacionLaboral(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [obtenerPostulacion] = await db
      .select()
      .from(postulacioneslaboralesTable)
      .where(eq(postulacioneslaboralesTable.id, id));

    if (!obtenerPostulacion) {
      res.status(404).json({ error: 'Oferta laboral no encontrada' });
    } else {
      res.status(200).json(obtenerPostulacion);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener oferta laboral' });
  }
}

/**
 * @swagger
 * /postulaciones-laborales/{id}:
 *   put:
 *     summary: Actualizar una postulación laboral
 *     tags: [postulacionesLaborales]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la postulación laboral
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cv_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Postulación actualizada correctamente
 *       404:
 *         description: Postulación no encontrada
 *       500:
 *         description: Error al actualizar la postulación
 */
export async function updatePostulacionLaboral(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [postulacionActualizada] = await db
      .update(postulacioneslaboralesTable)
      .set(req.cleanBody)
      .where(eq(postulacioneslaboralesTable.id, id))
      .returning();

    if (!postulacionActualizada) {
      res.status(404).json({ error: 'Oferta laboral no encontrada' });
    } else {
      res.status(200).json(postulacionActualizada);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la oferta laboral' });
  }
}

/**
 * @swagger
 * /postulaciones-laborales/{id}:
 *   delete:
 *     summary: Eliminar una postulación laboral
 *     tags: [postulacionesLaborales]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la postulación laboral
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Postulación eliminada correctamente
 *       404:
 *         description: Postulación no encontrada
 *       500:
 *         description: Error al eliminar la postulación
 */
export async function deletePostulacionLaboral(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [postulacionEliminada] = await db
      .delete(postulacioneslaboralesTable)
      .where(eq(postulacioneslaboralesTable.id, id))
      .returning();

    if (!postulacionEliminada) {
      res.status(404).json({ error: 'Oferta laboral no encontrada' });
    } else {
      res.status(200).json({ message: 'Oferta laboral eliminada correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la oferta laboral' });
  }
}
