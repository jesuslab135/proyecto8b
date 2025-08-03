import { Request, Response } from 'express';
import * as XLSX from 'xlsx';
import { db } from '../../db/index';
import { randomUUID } from 'crypto';
import { universidadesTable } from '../../db/universidadesSchema';
import { eq } from 'drizzle-orm';
import { tokensInicialesAccesoTable } from '../../db/tokensInicialesAccesoSchema';
import { logger } from '../../utils/logger';
import { DatabaseLogger } from '../../utils/databaseLogger';

/**
 * @swagger
 * tags:
 *   name: universidades
 *   description: Endpoints para gestión de universidades
 */

/**
 * @swagger
 * /universidades:
 *   post:
 *     summary: Crear una nueva universidad
 *     tags: [universidades]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Universidad creada exitosamente
 *       500:
 *         description: Error al crear la universidad
 */
export async function createUniversidad(req: Request, res: Response) {
	const startTime = Date.now();

	try {
		const { id, ...data } = req.cleanBody;

		logger.info('[UNIVERSIDAD] Creating new university', {
			userId: req.userId,
			universityData: {
				nombre: data.nombre,
				dominio_correo: data.dominio_correo,
			},
		});

		const [newUniversidad] = await DatabaseLogger.logInsert(
			() => db.insert(universidadesTable).values(data).returning(),
			'universidades',
			data
		);

		const duration = Date.now() - startTime;
		logger.info('[UNIVERSIDAD] University created successfully', {
			userId: req.userId,
			universityId: newUniversidad.id,
			nombre: newUniversidad.nombre,
			duration: `${duration}ms`,
		});

		res.status(201).json(newUniversidad);
	} catch (e) {
		const duration = Date.now() - startTime;
		logger.error('[UNIVERSIDAD] Failed to create university', e as Error, {
			userId: req.userId,
			universityData: req.cleanBody,
			duration: `${duration}ms`,
		});
		res.status(500).json({ error: 'Error al crear la universidad' });
	}
}

/**
 * @swagger
 * /universidades:
 *   get:
 *     summary: Obtener todas las universidades
 *     tags: [universidades]
 *     responses:
 *       200:
 *         description: Lista de universidades
 *       500:
 *         description: Error al obtener las universidades
 */
export async function listUniversidades(_req: Request, res: Response) {
	const startTime = Date.now();

	try {
		logger.debug('[UNIVERSIDAD] Fetching all universities');

		const universidades = await DatabaseLogger.logSelect(
			() => db.select().from(universidadesTable),
			'universidades',
			'listing all universities'
		);

		const duration = Date.now() - startTime;
		logger.info('[UNIVERSIDAD] Universities list retrieved', {
			count: universidades.length,
			duration: `${duration}ms`,
		});

		res.status(200).json(universidades);
	} catch (e) {
		const duration = Date.now() - startTime;
		logger.error(
			'[UNIVERSIDAD] Failed to fetch universities list',
			e as Error,
			{
				duration: `${duration}ms`,
			}
		);
		res.status(500).json({ error: 'Error al obtener las universidades' });
	}
}

/**
 * @swagger
 * /universidades/{id}:
 *   get:
 *     summary: Obtener universidad por ID
 *     tags: [universidades]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la universidad
 *     responses:
 *       200:
 *         description: Universidad encontrada
 *       404:
 *         description: Universidad no encontrada
 *       500:
 *         description: Error al obtener la universidad
 */
export async function getUniversidad(req: Request, res: Response) {
	const startTime = Date.now();

	try {
		const id = parseInt(req.params.id);

		logger.debug('[UNIVERSIDAD] Fetching university by ID', {
			universityId: id,
			userId: req.userId,
		});

		const [universidad] = await DatabaseLogger.logSelect(
			() =>
				db
					.select()
					.from(universidadesTable)
					.where(eq(universidadesTable.id, id)),
			'universidades',
			`finding university by id ${id}`,
			{ id }
		);

		const duration = Date.now() - startTime;

		if (!universidad) {
			logger.warn('[UNIVERSIDAD] University not found', {
				universityId: id,
				userId: req.userId,
				duration: `${duration}ms`,
			});
			res.status(404).json({ error: 'Universidad no encontrada' });
		} else {
			logger.info('[UNIVERSIDAD] University retrieved successfully', {
				universityId: id,
				nombre: universidad.nombre,
				userId: req.userId,
				duration: `${duration}ms`,
			});
			res.status(200).json(universidad);
		}
	} catch (e) {
		const duration = Date.now() - startTime;
		logger.error('[UNIVERSIDAD] Failed to fetch university by ID', e as Error, {
			universityId: req.params.id,
			userId: req.userId,
			duration: `${duration}ms`,
		});
		res.status(500).json({ error: 'Error al obtener la universidad' });
	}
}

/**
 * @swagger
 * /universidades/{id}:
 *   put:
 *     summary: Actualizar universidad por ID
 *     tags: [universidades]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la universidad
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nombre:
 *                 type: string
 *     responses:
 *       200:
 *         description: Universidad actualizada
 *       404:
 *         description: Universidad no encontrada
 *       500:
 *         description: Error al actualizar la universidad
 */
export async function updateUniversidad(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updatedUniversidad] = await db
      .update(universidadesTable)
      .set(req.cleanBody)
      .where(eq(universidadesTable.id, id))
      .returning();

    if (!updatedUniversidad) {
      res.status(404).json({ error: 'Universidad no encontrada' });
    } else {
      res.status(200).json(updatedUniversidad);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar la universidad' });
  }
}

/**
 * @swagger
 * /universidades/{id}:
 *   delete:
 *     summary: Eliminar universidad por ID
 *     tags: [universidades]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID de la universidad
 *     responses:
 *       200:
 *         description: Universidad eliminada correctamente
 *       404:
 *         description: Universidad no encontrada
 *       500:
 *         description: Error al eliminar la universidad
 */
export async function deleteUniversidad(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(universidadesTable)
      .where(eq(universidadesTable.id, id))
      .returning();

    if (!deleted) {
      res.status(404).json({ error: 'Universidad no encontrada' });
    } else {
      res.status(200).json({ message: 'Universidad eliminada correctamente' });
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar la universidad' });
  }
}


/* export async function uploadAlumnosExcel(req: Request, res: Response) {
  try {
    if (!req.file) return res.status(400).json({ error: 'No se recibió archivo' });

    const workbook = XLSX.read(req.file.buffer, { type: 'buffer' });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const alumnos = XLSX.utils.sheet_to_json(sheet) as any[];

    const registros = [];

    for (const alumno of alumnos) {
      const { nombre, correo, rol_id, universidad_id, matricula, telefono } = alumno;

      const [nuevo] = await db.insert(usersTable).values({
        nombre,
        correo,
        rol_id,
        universidad_id,
        matricula,
        telefono,
      }).returning();

      const token = randomUUID();
      await db.insert(tokensInicialesAccesoTable).values({
        usuario_id: nuevo.id,
        token,
      });

      await sendTokenEmail(correo, token);
      registros.push(nuevo);
    }

    res.status(201).json({ insertados: registros.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al procesar archivo' });
  }
}
 */