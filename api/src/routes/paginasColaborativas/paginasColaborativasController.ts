// src/routes/paginasColaborativas/paginasColaborativasController.ts
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

export async function createPaginaColaborativa(req: Request, res: Response, next: NextFunction) {
  try {
    const data = req.cleanBody;
    data.creada_por = getUserId(req);  // siempre usar el ID del token

    const [nuevaPagina] = await db
      .insert(paginasColaborativasTable)
      .values(data)
      .returning();
    res.status(201).json(nuevaPagina);
  } catch (e) {
    console.error(e);
    next(e);
  }
}


export async function listPaginasColaborativas(_req: Request, res: Response, next: NextFunction) {
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

export async function getPaginaColaborativa(req: Request, res: Response, next: NextFunction) {
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
  } catch (e) {
    console.error(e);
    next(e);
  }
}


export async function updatePaginaColaborativa(req: Request, res: Response, next: NextFunction) {
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
  } catch (e) {
    console.error(e);
    next(e);
  }
}

export async function deletePaginaColaborativa(req: Request, res: Response, next: NextFunction) {
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
    
    res.status(200).json({ message: 'Página eliminada correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la página colaborativa' });
  }
}
