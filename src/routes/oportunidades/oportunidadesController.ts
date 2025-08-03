// src/routes/oportunidadesController.ts
import { Request, Response } from 'express';
import { db } from '../../db/index';
import { oportunidadesTable } from '../../db/oportunidadesSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * /oportunidades:
 *   post:
 *     summary: Crear una nueva oportunidad
 *     tags: [oportunidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - titulo
 *               - descripcion
 *               - opportunity_type_id
 *               - universidad_id
 *               - fecha_limite
 *             properties:
 *               titulo:
 *                 type: string
 *               descripcion:
 *                 type: string
 *               universidad_id:
 *                 type: integer
 *               fecha_limite:
 *                 type: string
 *                 format: date
 *               opportunity_type_id:
 *                 type: integer
 *                 nullable: true
 *               state_id:
 *                 type: integer
 *                 nullable: true
 *               created_by:
 *                 type: integer
 *                 nullable: true
 *               empresa:
 *                 type: string
 *                 nullable: true
 *               salario_min:
 *                 type: number
 *                 format: double
 *                 nullable: true
 *               salario_max:
 *                 type: number
 *                 format: double
 *                 nullable: true
 *               modality_id:
 *                 type: integer
 *                 nullable: true
 *               requisitos:
 *                 type: string
 *                 nullable: true
 *               beneficios:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       201:
 *         description: Oportunidad creada exitosamente
 *       500:
 *         description: Error al crear la oportunidad
 */
export async function createOportunidad(req: Request, res: Response) {
  try {
    const { id, ...data } = req.cleanBody;
    if (data.fecha_limite) data.fecha_limite = new Date(data.fecha_limite);
    const [nueva] = await db.insert(oportunidadesTable).values(data).returning();
    res.status(201).json(nueva);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear la oportunidad' });
  }
}

/**
 * @swagger
 * /oportunidades:
 *   get:
 *     summary: Obtener todas las oportunidades
 *     tags: [oportunidades]
 *     responses:
 *       200:
 *         description: Lista de oportunidades
 *       500:
 *         description: Error al obtener las oportunidades
 */
export async function listOportunidades(_req: Request, res: Response) {
  try {
    const oportunidades = await db.select().from(oportunidadesTable);
    res.status(200).json(oportunidades);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las oportunidades' });
  }
}

/**
 * @swagger
 * /oportunidades/{id}:
 *   get:
 *     summary: Obtener una oportunidad por ID
 *     tags: [oportunidades]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la oportunidad
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Oportunidad encontrada
 *       404:
 *         description: Oportunidad no encontrada
 *       500:
 *         description: Error al obtener la oportunidad
 */
export async function getOportunidad(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [oportunidad] = await db
      .select()
      .from(oportunidadesTable)
      .where(eq(oportunidadesTable.id, id));

    if (!oportunidad) {
      res.status(404).json({ error: 'Oportunidad no encontrada' });
    } else {
      res.status(200).json(oportunidad);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener la oportunidad' });
  }
}

/**
 * @swagger
 * /oportunidades/creadas-por/{userId}:
 *   get:
 *     summary: Obtener oportunidades creadas por un usuario
 *     tags: [oportunidades]
 *     parameters:
 *       - name: userId
 *         in: path
 *         required: true
 *         description: ID del usuario creador
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de oportunidades creadas por el usuario
 *       404:
 *         description: No se encontraron oportunidades
 *       500:
 *         description: Error al obtener las oportunidades
 */
export async function getOportunidadesByCreator(req: Request, res: Response) {
  try {
    const userId = parseInt(req.params.userId);
     if (isNaN(userId)) {
    return res.status(400).json({ error: 'Parámetro inválido: userId debe ser un número.' });
  }
    const oportunidades = await db
      .select()
      .from(oportunidadesTable)
      .where(eq(oportunidadesTable.created_by, userId));

    if (oportunidades.length === 0) {
      res.status(404).json({ error: 'No se encontraron oportunidades creadas por este usuario' });
    } else {
      res.status(200).json(oportunidades);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener las oportunidades del usuario' });
  }
}


/**
 * @swagger
 * /oportunidades/{id}:
 *   put:
 *     summary: Actualizar una oportunidad por ID
 *     tags: [oportunidades]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la oportunidad
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
 *               tipo:
 *                 type: string
 *               universidad_id:
 *                 type: integer
 *               fecha_limite:
 *                 type: string
 *                 format: date
 *               opportunity_type_id:
 *                 type: integer
 *                 nullable: true
 *               state_id:
 *                 type: integer
 *                 nullable: true
 *               created_by:
 *                 type: integer
 *                 nullable: true
 *               empresa:
 *                 type: string
 *                 nullable: true
 *               salario_min:
 *                 type: number
 *                 format: double
 *                 nullable: true
 *               salario_max:
 *                 type: number
 *                 format: double
 *                 nullable: true
 *               modality_id:
 *                 type: integer
 *                 nullable: true
 *               requisitos:
 *                 type: string
 *                 nullable: true
 *               beneficios:
 *                 type: string
 *                 nullable: true
 *     responses:
 *       200:
 *         description: Oportunidad actualizada correctamente
 *       404:
 *         description: Oportunidad no encontrada
 *       500:
 *         description: Error al actualizar la oportunidad
 */
export async function updateOportunidad(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const data = { ...req.cleanBody };
    delete data.id;
    if (data.fecha_limite) data.fecha_limite = new Date(data.fecha_limite);
    const [actualizada] = await db
      .update(oportunidadesTable)
      .set(data)
      .where(eq(oportunidadesTable.id, id))
      .returning();

    if (!actualizada) {
      res.status(404).json({ error: 'Oportunidad no encontrada' });
    } else {
      res.status(200).json(actualizada);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la oportunidad' });
  }
}

/**
 * @swagger
 * /oportunidades/{id}:
 *   delete:
 *     summary: Eliminar una oportunidad por ID
 *     tags: [oportunidades]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID de la oportunidad
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Oportunidad eliminada correctamente
 *       404:
 *         description: Oportunidad no encontrada
 *       500:
 *         description: Error al eliminar la oportunidad
 */
export async function deleteOportunidad(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [eliminada] = await db
      .delete(oportunidadesTable)
      .where(eq(oportunidadesTable.id, id))
      .returning();

    if (!eliminada) {
      res.status(404).json({ error: 'Oportunidad no encontrada' });
    } else {
      res.status(200).json({ message: 'Oportunidad eliminada correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la oportunidad' });
  }
}
