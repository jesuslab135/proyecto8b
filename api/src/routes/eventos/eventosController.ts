// src/routes/eventosController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { eventosTable } from '../../db/eventosSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /eventos:
 *   post:
 *     summary: Crear un nuevo evento
 *     tags: [eventos]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - tipo
 *               - creador_id
 *               - universidad_id
 *               - fecha_inicio
 *               - fecha_fin
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               tipo:
 *                 type: string
 *               creador_id:
 *                 type: integer
 *               universidad_id:
 *                 type: integer
 *               fecha_inicio:
 *                 type: string
 *                 format: date-time
 *               fecha_fin:
 *                 type: string
 *                 format: date-time
 *               enlace_acceso:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
 *       500:
 *         description: Error al crear el evento
 */
export async function createEvento(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    data.fecha_inicio = new Date(data.fecha_inicio);
    data.fecha_fin = new Date(data.fecha_fin);

    const [nuevoEvento] = await db.insert(eventosTable).values(data).returning();
    res.status(201).json(nuevoEvento);
  } catch (e) {
    console.error('❌ Error en createEvento:', e);
    res.status(500).json({ error: 'Error al crear el evento' });
  }
}

/**
 * @swagger
 * /eventos:
 *   get:
 *     summary: Obtener todos los eventos
 *     tags: [eventos]
 *     responses:
 *       200:
 *         description: Lista de eventos
 *       500:
 *         description: Error al obtener los eventos
 */
export async function listEventos(_req: Request, res: Response) {
  try {
    const eventos = await db.select().from(eventosTable);
    res.status(200).json(eventos);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener los eventos' });
  }
}

/**
 * @swagger
 * /eventos/{id}:
 *   get:
 *     summary: Obtener un evento por ID
 *     tags: [eventos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Evento encontrado
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error al obtener el evento
 */
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

/**
 * @swagger
 * /eventos/{id}:
 *   put:
 *     summary: Actualizar un evento por ID
 *     tags: [eventos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento
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
 *               tipo:
 *                 type: string
 *               creador_id:
 *                 type: integer
 *               universidad_id:
 *                 type: integer
 *               fecha_inicio:
 *                 type: string
 *                 format: date-time
 *               fecha_fin:
 *                 type: string
 *                 format: date-time
 *               enlace_acceso:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Evento actualizado correctamente
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error al actualizar el evento
 */
export async function updateEvento(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const data = req.cleanBody;

    if (data.fecha_inicio) data.fecha_inicio = new Date(data.fecha_inicio);
    if (data.fecha_fin) data.fecha_fin = new Date(data.fecha_fin);

    const [actualizado] = await db
      .update(eventosTable)
      .set(data)
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

/**
 * @swagger
 * /eventos/{id}:
 *   delete:
 *     summary: Eliminar un evento por ID
 *     tags: [eventos]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del evento a eliminar
 *     responses:
 *       200:
 *         description: Evento eliminado correctamente
 *       404:
 *         description: Evento no encontrado
 *       500:
 *         description: Error al eliminar el evento
 */
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
