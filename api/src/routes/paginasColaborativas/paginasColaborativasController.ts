// Fabian Mendoza Contreras
import { Request, Response, NextFunction } from 'express';
import { db } from '../../db';
import { paginasColaborativasTable } from '../../db/paginasColaborativasSchema';
import { eq } from 'drizzle-orm';

// Extiende la interfaz Request para incluir 'user'
declare global {
  namespace Express {
    interface User {
      id: number;
    }
    interface Request {
      user?: User;
      cleanBody?: any; 
    }
  }
}

// Helper para extraer ID de usuario autenticado
const getUserId = (req: Request): number => {
  if (!req.user || typeof req.user.id !== 'number') {
    throw new Error('Usuario no autenticado');
  }
  return req.user.id;
};

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
 *               - descripcion
 *               - proyecto_id
 *               - permisos_lectura
 *               - permisos_escritura
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               proyecto_id:
 *                 type: integer
 *               permisos_lectura:
 *                 type: array
 *                 items:
 *                   type: string
 *               permisos_escritura:
 *                 type: array
 *                 items:
 *                   type: string
 *               orden:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Página colaborativa creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginaColaborativa'
 *       500:
 *         description: Error al crear la página colaborativa
 */

export async function createPaginaColaborativa(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = req.cleanBody;
    data.creada_por = getUserId(req);  // siempre usar el ID del token

    const [nuevaPagina] = await db
      .insert(paginasColaborativasTable)
      .values(data)
      .returning();

    res.status(201).json(nuevaPagina);
  } catch (error) {
    console.error(error);
    next(error);
  }
}
/**
 * @swagger
 * /paginas-colaborativas:
 *   get:
 *     summary: Obtener todas las páginas colaborativas
 *     tags: [paginasColaborativas]
 *     parameters:
 *       - in: query
 *         name: proyecto_id
 *         schema:
 *           type: integer
 *         description: Filtrar por ID de proyecto (opcional)
 *     responses:
 *       200:
 *         description: Lista de páginas colaborativas
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PaginaColaborativa'
 *       500:
 *         description: Error al obtener las páginas colaborativas
 */

export async function listPaginasColaborativas(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const proyectoId = req.query.proyecto_id ? Number(req.query.proyecto_id) : null;
    let consulta;

    if (proyectoId) {
      consulta = db.select().from(paginasColaborativasTable).where(eq(paginasColaborativasTable.proyecto_id, proyectoId));
    } else {
      consulta = db.select().from(paginasColaborativasTable);
    }

    const todas = await consulta.orderBy(paginasColaborativasTable.orden);
    const userId = getUserId(req);

    // Filtrar solo las páginas con permiso de lectura o creadas por el usuario
    const filtradas = todas.filter(p =>
      p.creada_por === userId || (p.permisos_lectura ?? []).includes(String(userId))

    );

    res.status(200).json(filtradas);
  } catch (error) {
    console.error(error);
    next(error);
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
 *         schema:
 *           type: integer
 *         description: ID de la página
 *     responses:
 *       200:
 *         description: Página encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginaColaborativa'
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: Página no encontrada
 *       500:
 *         description: Error al obtener la página colaborativa
 */

export async function getPaginaColaborativa(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const [pagina] = await db
      .select()
      .from(paginasColaborativasTable)
      .where(eq(paginasColaborativasTable.id, id));

    if (!pagina) {
      return res.status(404).json({ error: 'Página no encontrada' });
    }

    const userId = getUserId(req);
    if (pagina.creada_por !== userId && !(pagina.permisos_lectura ?? []).includes(String(userId))) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    res.status(200).json(pagina);
  } catch (error) {
    console.error(error);
    next(error);
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
 *         schema:
 *           type: integer
 *         description: ID de la página a actualizar
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
 *               proyecto_id:
 *                 type: integer
 *               permisos_lectura:
 *                 type: array
 *                 items:
 *                   type: string
 *               permisos_escritura:
 *                 type: array
 *                 items:
 *                   type: string
 *               orden:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Página actualizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PaginaColaborativa'
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: Página no encontrada
 *       500:
 *         description: Error al actualizar la página colaborativa
 */

export async function updatePaginaColaborativa(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const [pagina] = await db
      .select()
      .from(paginasColaborativasTable)
      .where(eq(paginasColaborativasTable.id, id));

    if (!pagina) {
      return res.status(404).json({ error: 'Página no encontrada' });
    }

    const userId = getUserId(req);
    if (pagina.creada_por !== userId && !(pagina.permisos_lectura ?? []).includes(String(userId))) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    const [actualizada] = await db
      .update(paginasColaborativasTable)
      .set(req.cleanBody)
      .where(eq(paginasColaborativasTable.id, id))
      .returning();

    res.status(200).json(actualizada);
  } catch (error) {
    console.error(error);
    next(error);
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
 *         schema:
 *           type: integer
 *         description: ID de la página a eliminar
 *     responses:
 *       204:
 *         description: Página eliminada correctamente
 *       403:
 *         description: Acceso denegado
 *       404:
 *         description: Página no encontrada
 *       500:
 *         description: Error al eliminar la página colaborativa
 */

export async function deletePaginaColaborativa(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const id = Number(req.params.id);
    const [pagina] = await db
      .select()
      .from(paginasColaborativasTable)
      .where(eq(paginasColaborativasTable.id, id));

    if (!pagina) {
      return res.status(404).json({ error: 'Página no encontrada' });
    }

    const userId = getUserId(req);
    if (pagina.creada_por !== userId && !(pagina.permisos_lectura ?? []).includes(String(userId))) {
      return res.status(403).json({ error: 'Acceso denegado' });
    }

    await db
      .delete(paginasColaborativasTable)
      .where(eq(paginasColaborativasTable.id, id));

    res.status(204).send();
  } catch (error) {
    console.error(error);
    next(error);
  }
}
