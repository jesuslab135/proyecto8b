import { Request, Response } from 'express';
import { db } from '../../db';
import { paginasColaborativasTable } from '../../db/paginasColaborativasSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /paginas-colaborativas:
 *   post:
 *     summary: Crear una nueva página colaborativa
 *     tags: [paginasColaborativas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - contenido
 *               - proyecto_id
 *             properties:
 *               titulo:
 *                 type: string
 *               contenido:
 *                 type: string
 *               proyecto_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Página colaborativa creada exitosamente
 *       500:
 *         description: Error al crear la página colaborativa
 */
export async function createPaginaColaborativa(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nueva] = await db.insert(paginasColaborativasTable).values(data).returning();
    res.status(201).json(nueva);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear la página colaborativa' });
  }
}

/**
 * @swagger
 * /paginas-colaborativas:
 *   get:
 *     summary: Obtener todas las páginas colaborativas
 *     tags: [paginasColaborativas]
 *     responses:
 *       200:
 *         description: Lista de páginas colaborativas
 *       500:
 *         description: Error al obtener las páginas colaborativas
 */
export async function listPaginasColaborativas(_req: Request, res: Response) {
  try {
    const paginas = await db.select().from(paginasColaborativasTable);
    res.status(200).json(paginas);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las páginas colaborativas' });
  }
}

/**
 * @swagger
 * /paginas-colaborativas/{id}:
 *   get:
 *     summary: Obtener una página colaborativa por ID
 *     tags: [paginasColaborativas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la página
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Página encontrada
 *       404:
 *         description: Página no encontrada
 *       500:
 *         description: Error al obtener la página colaborativa
 */
export async function getPaginaColaborativa(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [pagina] = await db.select().from(paginasColaborativasTable).where(eq(paginasColaborativasTable.id, id));
    if (!pagina) {
      res.status(404).json({ error: 'Página no encontrada' });
    } else {
      res.status(200).json(pagina);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener la página colaborativa' });
  }
}

/**
 * @swagger
 * /paginas-colaborativas/{id}:
 *   put:
 *     summary: Actualizar una página colaborativa por ID
 *     tags: [paginasColaborativas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la página a actualizar
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
 *               contenido:
 *                 type: string
 *     responses:
 *       200:
 *         description: Página actualizada correctamente
 *       404:
 *         description: Página no encontrada
 *       500:
 *         description: Error al actualizar la página colaborativa
 */
export async function updatePaginaColaborativa(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [actualizada] = await db
      .update(paginasColaborativasTable)
      .set(req.cleanBody)
      .where(eq(paginasColaborativasTable.id, id))
      .returning();
    if (!actualizada) {
      res.status(404).json({ error: 'Página no encontrada' });
    } else {
      res.status(200).json(actualizada);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la página colaborativa' });
  }
}

/**
 * @swagger
 * /paginas-colaborativas/{id}:
 *   delete:
 *     summary: Eliminar una página colaborativa por ID
 *     tags: [paginasColaborativas]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la página a eliminar
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Página eliminada correctamente
 *       404:
 *         description: Página no encontrada
 *       500:
 *         description: Error al eliminar la página colaborativa
 */
export async function deletePaginaColaborativa(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [eliminada] = await db
      .delete(paginasColaborativasTable)
      .where(eq(paginasColaborativasTable.id, id))
      .returning();

    if (!eliminada) {
      res.status(404).json({ error: 'Página no encontrada' });
    } else {
      res.status(200).json({ message: 'Página eliminada correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la página colaborativa' });
  }
}
