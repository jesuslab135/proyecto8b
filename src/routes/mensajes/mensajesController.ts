// src/routes/mensajesController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { mensajesTable } from '../../db/mensajesSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /mensajes:
 *   post:
 *     summary: Crear y enviar un nuevo mensaje
 *     tags: [mensajes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - conversacion_id
 *               - emisor_id
 *               - contenido
 *             properties:
 *               conversacion_id:
 *                 type: integer
 *               emisor_id:
 *                 type: integer
 *               contenido:
 *                 type: string
 *     responses:
 *       201:
 *         description: Mensaje enviado exitosamente
 *       500:
 *         description: Error al enviar mensaje
 */
export async function createMensaje(req: Request, res: Response) {
  try {
    const {id, ...data} = req.cleanBody;
    const [nuevoMensaje] = await db.insert(mensajesTable).values(data).returning();
    res.status(201).json(nuevoMensaje);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al enviar mensaje' });
  }
}

/**
 * @swagger
 * /mensajes:
 *   get:
 *     summary: Obtener todos los mensajes
 *     tags: [mensajes]
 *     responses:
 *       200:
 *         description: Lista de mensajes
 *       500:
 *         description: Error al obtener mensajes
 */
export async function listMensajes(_req: Request, res: Response) {
  try {
    const mensajes = await db.select().from(mensajesTable);
    res.status(200).json(mensajes);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener mensajes' });
  }
}

/**
 * @swagger
 * /mensajes/{id}:
 *   get:
 *     summary: Obtener un mensaje por ID
 *     tags: [mensajes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del mensaje
 *     responses:
 *       200:
 *         description: Mensaje encontrado
 *       404:
 *         description: Mensaje no encontrado
 *       500:
 *         description: Error al obtener el mensaje
 */
export async function getMensaje(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [mensaje] = await db.select().from(mensajesTable).where(eq(mensajesTable.id, id));
    if (!mensaje) return res.status(404).json({ error: 'Mensaje no encontrado' });
    res.status(200).json(mensaje);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener el mensaje' });
  }
}

/**
 * @swagger
 * /mensajes/{id}:
 *   put:
 *     summary: Actualizar el contenido de un mensaje
 *     tags: [mensajes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del mensaje a actualizar
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               contenido:
 *                 type: string
 *               leido:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Mensaje actualizado
 *       404:
 *         description: Mensaje no encontrado
 *       500:
 *         description: Error al actualizar el mensaje
 */
export async function updateMensaje(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [actualizado] = await db
      .update(mensajesTable)
      .set(req.cleanBody)
      .where(eq(mensajesTable.id, id))
      .returning();

    if (!actualizado) return res.status(404).json({ error: 'Mensaje no encontrado' });
    res.status(200).json(actualizado);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar el mensaje' });
  }
}

/**
 * @swagger
 * /mensajes/{id}:
 *   delete:
 *     summary: Eliminar un mensaje por ID
 *     tags: [mensajes]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del mensaje a eliminar
 *     responses:
 *       200:
 *         description: Mensaje eliminado correctamente
 *       404:
 *         description: Mensaje no encontrado
 *       500:
 *         description: Error al eliminar el mensaje
 */
export async function deleteMensaje(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [eliminado] = await db
      .delete(mensajesTable)
      .where(eq(mensajesTable.id, id))
      .returning();

    if (!eliminado) return res.status(404).json({ error: 'Mensaje no encontrado' });
    res.status(200).json({ message: 'Mensaje eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar el mensaje' });
  }
}
