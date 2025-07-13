import { Request, Response } from 'express';
import { db } from '../../db/index';
import { ofertasLaboralesTable } from '../../db/ofertasLaboralesSchema';
import { eq } from 'drizzle-orm';

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

export async function listOfertaLaboral(_req: Request, res: Response) {
  try {
    const ofertas = await db.select().from(ofertasLaboralesTable);
    res.status(200).json(ofertas);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las ofertas laborales' });
  }
}

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
