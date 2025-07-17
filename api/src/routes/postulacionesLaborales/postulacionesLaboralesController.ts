import { Request, Response } from 'express';
import { db } from '../../db/index';
import { postulacioneslaboralesTable } from '../../db/postulacionesLaboralesSchema';
import { eq } from 'drizzle-orm';

export async function createPostulacionLaboral(req: Request, res: Response) {
  try {
    const {id, fecha, ...data} = req.cleanBody;
    const [nuevaPostulacion] = await db.insert(postulacioneslaboralesTable).values(data).returning();
    res.status(201).json(nuevaPostulacion);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al registrar una postulacion' });
  }
}

export async function listPostulacionLaboral(_req: Request, res: Response) {
  try {
    const postulacionLaboral = await db.select().from(postulacioneslaboralesTable);
    res.status(200).json(postulacionLaboral);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las postulaciones' });
  }
}

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
