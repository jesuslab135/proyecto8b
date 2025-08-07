import { Request, Response } from 'express';
import { db } from '../../db/index';
import { participacionesProyectoTable } from '../../db/participacionesProyectoSchema'; 
import { eq, and } from 'drizzle-orm';

/**
 * @swagger
 * /participaciones-proyecto:
 *   post:
 *     summary: Crear una participación en proyecto
 *     tags: [participacionesProyecto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - proyecto_id
 *               - usuario_id
 *               - rol_id
 *             properties:
 *               proyecto_id:
 *                 type: integer
 *               usuario_id:
 *                 type: integer
 *               rol_id:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Participación creada exitosamente
 *       500:
 *         description: Error al crear la participación
 */
import { usuariosTable } from '../../db/usuariosSchema'; // importa tu tabla de usuarios

export async function createParticipacionProyecto(req: Request, res: Response) {
  try {
    const data = req.cleanBody;

    // Si llega email, busca el usuario y usa su ID
    if (data.email && !data.usuario_id) {
      const [user] = await db
        .select()
        .from(usuariosTable)
        .where(eq(usuariosTable.correo, data.email));
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      data.usuario_id = user.id;
    }

    // Valida que venga usuario_id y proyecto_id y los demás requeridos
    if (!data.usuario_id || !data.proyecto_id || !data.rol_id || !data.invitado_por) {
      return res.status(400).json({ error: 'usuario_id, proyecto_id, rol_id e invitado_por son obligatorios' });
    }

    // Completa valores default si faltan
    if (!data.estado) data.estado = 'pendiente';
    if (!data.fecha_invitacion) data.fecha_invitacion = new Date();

    // Verifica si ya existe la participación
    const [existing] = await db
      .select()
      .from(participacionesProyectoTable)
      .where(
        and(
          eq(participacionesProyectoTable.usuario_id, data.usuario_id),
          eq(participacionesProyectoTable.proyecto_id, data.proyecto_id)
        )
      );
    if (existing) {
      return res.status(400).json({ error: 'Usuario ya invitado o participa en este proyecto' });
    }

    // SOLO los campos válidos (esto es lo que arregla todo)
    const insertData = {
      usuario_id: data.usuario_id,
      proyecto_id: data.proyecto_id,
      rol_id: data.rol_id,
      invitado_por: data.invitado_por,
      estado: data.estado,
      fecha_invitacion: data.fecha_invitacion,
    };

    // Log para debug
    console.log('Insertando participación:', insertData);

    // Ahora sí, inserta solo lo permitido
    const [nueva] = await db.insert(participacionesProyectoTable).values(insertData).returning();

    res.status(201).json(nueva);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear la participación de proyecto' });
  }
}



/**
 * @swagger
 * /participaciones-proyecto:
 *   get:
 *     summary: Obtener todas las participaciones en proyectos
 *     tags: [participacionesProyecto]
 *     responses:
 *       200:
 *         description: Lista de participaciones
 *       500:
 *         description: Error al obtener las participaciones
 */
export async function listParticipacionesProyecto(_req: Request, res: Response) {
  try {
    const parProy = await db.select().from(participacionesProyectoTable);
    res.status(200).json(parProy);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las participaciones de proyecto' });
  }
}

/**
 * @swagger
 * /participaciones-proyecto/{id}:
 *   get:
 *     summary: Obtener una participación por ID
 *     tags: [participacionesProyecto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la participación
 *     responses:
 *       200:
 *         description: Participación encontrada
 *       404:
 *         description: Participación no encontrada
 *       500:
 *         description: Error al obtener la participación
 */
export async function getParticipacionProyecto(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [parProy] = await db
      .select()
      .from(participacionesProyectoTable)
      .where(eq(participacionesProyectoTable.id, id));

    if (!parProy) {
      res.status(404).json({ error: 'Participacion de Proyecto no encontrada' });
    } else {
      res.status(200).json(parProy);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener la Participacion de Proyecto' });
  }
}

/**
 * @swagger
 * /participaciones-proyecto/{id}:
 *   put:
 *     summary: Actualizar una participación en proyecto
 *     tags: [participacionesProyecto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la participación
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               rol_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Participación actualizada correctamente
 *       404:
 *         description: Participación no encontrada
 *       500:
 *         description: Error al actualizar la participación
 */
export async function updateParticipacionProyecto(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [actualizada] = await db
      .update(participacionesProyectoTable)
      .set(req.cleanBody)
      .where(eq(participacionesProyectoTable.id, id))
      .returning();

    if (!actualizada) {
      res.status(404).json({ error: 'Participacion de Proyecto no encontrada' });
    } else {
      res.status(200).json(actualizada);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la Participacion de Proyecto' });
  }
}

/**
 * @swagger
 * /participaciones-proyecto/{id}:
 *   delete:
 *     summary: Eliminar una participación por ID
 *     tags: [participacionesProyecto]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID de la participación
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Participación eliminada correctamente
 *       404:
 *         description: Participación no encontrada
 *       500:
 *         description: Error al eliminar la participación
 */
export async function deleteParticipacionProyecto(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [eliminada] = await db
      .delete(participacionesProyectoTable)
      .where(eq(participacionesProyectoTable.id, id))
      .returning();

    if (!eliminada) {
      res.status(404).json({ error: 'Participacion de Proyecto no encontrada' });
    } else {
      res.status(200).json({ message: 'Participacion de Proyecto eliminada correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la Participacion de Proyecto' });
  }
}
