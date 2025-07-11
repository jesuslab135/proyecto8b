// src/routes/eventosController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { eventosTable } from '../../db/eventosSchema';
import { eq } from 'drizzle-orm';

export async function createEvento(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nuevoEvento] = await db.insert(eventosTable).values(data).returning();
    res.status(201).json(nuevoEvento);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear el evento' });
  }
}

export async function listEventos(_req: Request, res: Response) {
  try {
    const eventos = await db.select().from(eventosTable);
    res.status(200).json(eventos);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los eventos' });
  }
}

export async function getEvento(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [evento] = await db
      .select()
      .from(eventosTable)
      .where(eq(eventosTable.id, id));

    if (!evento) {
      res.status(404).json({ error: 'Evento no encontrado' });
    } else {
      res.status(200).json(evento);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el evento' });
  }
}

export async function updateEvento(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [actualizado] = await db
      .update(eventosTable)
      .set(req.cleanBody)
      .where(eq(eventosTable.id, id))
      .returning();

    if (!actualizado) {
      res.status(404).json({ error: 'Evento no encontrado' });
    } else {
      res.status(200).json(actualizado);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el evento' });
  }
}

export async function deleteEvento(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [eliminado] = await db
      .delete(eventosTable)
      .where(eq(eventosTable.id, id))
      .returning();

    if (!eliminado) {
      res.status(404).json({ error: 'Evento no encontrado' });
    } else {
      res.status(200).json({ message: 'Evento eliminado correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el evento' });
  }
}
