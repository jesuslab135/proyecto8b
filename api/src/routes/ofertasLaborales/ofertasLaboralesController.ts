import { Request, Response } from 'express';
import { db } from '../../db/index';
import { ofertasLaboralesTable } from '../../db/ofertasLaboralesSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /ofertas-laborales:
 *   post:
 *     summary: Crear una nueva oferta laboral
 *     tags: [ofertasLaborales]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - empresa
 *               - ubicacion
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               empresa:
 *                 type: string
 *               ubicacion:
 *                 type: string
 *               fecha_limite:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Oferta laboral creada exitosamente
 *       500:
 *         description: Error al registrar una oferta laboral
 */
export async function createOfertaLaboral(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nuevaOferta] = await db.insert(ofertasLaboralesTable).values(data).returning();
    res.status(201).json(nuevaOferta);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al registrar una oferta laboral' });
  }
}

/**
 * @swagger
 * /ofertas-laborales:
 *   get:
 *     summary: Obtener todas las ofertas laborales
 *     tags: [ofertasLaborales]
 *     responses:
 *       200:
 *         description: Lista de ofertas laborales
 *       500:
 *         description: Error al obtener las ofertas laborales
 */
export async function listOfertaLaboral(_req: Request, res: Response) {
  try {
    const ofertas = await db.select().from(ofertasLaboralesTable);
    res.status(200).json(ofertas);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las ofertas laborales' });
  }
}

/**
 * @swagger
 * /ofertas-laborales/{id}:
 *   get:
 *     summary: Obtener una oferta laboral por ID
 *     tags: [ofertasLaborales]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la oferta laboral
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Oferta encontrada
 *       404:
 *         description: Oferta laboral no encontrada
 *       500:
 *         description: Error al obtener oferta laboral
 */
export async function getOfertaLaboral(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [ofertas] = await db
      .select()
      .from(ofertasLaboralesTable)
      .where(eq(ofertasLaboralesTable.id, id));

    if (!ofertas) {
      res.status(404).json({ error: 'Oferta laboral no encontrada' });
    } else {
      res.status(200).json(ofertas);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener oferta laboral' });
  }
}

/**
 * @swagger
 * /ofertas-laborales/{id}:
 *   put:
 *     summary: Actualizar una oferta laboral
 *     tags: [ofertasLaborales]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la oferta a actualizar
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               empresa:
 *                 type: string
 *               ubicacion:
 *                 type: string
 *               fecha_limite:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Oferta laboral actualizada
 *       404:
 *         description: Oferta laboral no encontrada
 *       500:
 *         description: Error al actualizar la oferta laboral
 */
export async function updateOfertaLaboral(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [ofertaActualizada] = await db
      .update(ofertasLaboralesTable)
      .set(req.cleanBody)
      .where(eq(ofertasLaboralesTable.id, id))
      .returning();

    if (!ofertaActualizada) {
      res.status(404).json({ error: 'Oferta laboral no encontrada' });
    } else {
      res.status(200).json(ofertaActualizada);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la oferta laboral' });
  }
}

/**
 * @swagger
 * /ofertas-laborales/{id}:
 *   delete:
 *     summary: Eliminar una oferta laboral
 *     tags: [ofertasLaborales]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la oferta a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Oferta laboral eliminada correctamente
 *       404:
 *         description: Oferta laboral no encontrada
 *       500:
 *         description: Error al eliminar la oferta laboral
 */
export async function deleteOfertaLaboral(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [ofertaEliminada] = await db
      .delete(ofertasLaboralesTable)
      .where(eq(ofertasLaboralesTable.id, id))
      .returning();

    if (!ofertaEliminada) {
      res.status(404).json({ error: 'Oferta laboral no encontrada' });
    } else {
      res.status(200).json({ message: 'Oferta laboral eliminada correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la oferta laboral' });
  }
}
