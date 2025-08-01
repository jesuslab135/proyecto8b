// src/routes/tokensInicialesAccesoController.ts
import e, { Request, Response } from 'express';
import { db } from '../../db';
import { tokensInicialesAccesoTable } from '../../db/tokensInicialesAccesoSchema';
import { eq } from 'drizzle-orm';

/**
 * @swagger
 * tags:
 *   name: tokensInicialesAcceso
 *   description: Endpoints para la gestión de tokens iniciales de acceso
 */ 

/**
 * @swagger
 * /tokens-iniciales-acceso:
 *   post:
 *     summary: Crear un nuevo token inicial de acceso
 *     tags: [tokensInicialesAcceso]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - descripcion
 *             properties:
 *               nombre:
 *                 type: string
 *               descripcion:
 *                 type: string
 *     responses:
 *       201:
 *         description: Token creado exitosamente
 *       500:
 *         description: Error al crear el token
 */


export async function createTokenInicialAcceso(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nuevo] = await db.insert(tokensInicialesAccesoTable).values(data).returning();
    res.status(201).json(nuevo);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al crear el token de acceso' });
  }
}

export async function listTokensInicialesAcceso(_req: Request, res: Response) {
  try {
    const tokens = await db.select().from(tokensInicialesAccesoTable);
    res.status(200).json(tokens);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener tokens de acceso' });
  }
}

/**
 * @swagger
 * /tokens-iniciales-acceso/{id}:
 *   get:
 *     summary: Obtener un token por ID
 *     tags: [tokensInicialesAcceso]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del token inicial de acceso
 *     responses:
 *       200:
 *         description: Token  encontrado
 *       404:
 *         description: Token no encontrado
 *       500:
 *         description: Error al obtener el token
 */

export async function getTokenInicialAcceso(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [token] = await db
      .select()
      .from(tokensInicialesAccesoTable)
      .where(eq(tokensInicialesAccesoTable.id, id));

    if (!token) {
      return res.status(404).json({ error: 'Token no encontrado' });
    }

    res.status(200).json(token);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener token' });
  }
}

/** 
 * * @swagger
 * /tokens-iniciales-acceso/usuario/{usuarioId}:
 *   get:
 *  summary: Obtener tokens por ID de usuario 
 *     tags: [tokensInicialesAcceso]
 *     parameters:
 *       - name: usuarioId  
 *        in: path
 *        required: true
 *        schema:
 *          type: integer
 *        description: ID del usuario
 *       responses:
 *       200:
 *         description: Lista de tokens encontrados
 *         404:
 *         description: No se encontraron tokens para este usuario
 *       500:
 *         description: Error al obtener tokens
 */

export async function getTokenByUsuarioId(req: Request, res: Response) {
  try {
    const usuarioId = parseInt(req.params.usuarioId);
    const tokens = await db
      .select()
      .from(tokensInicialesAccesoTable)
      .where(eq(tokensInicialesAccesoTable.usuario_id, usuarioId));
    if (tokens.length === 0) {
      return res.status(404).json({ error: 'No se encontraron tokens para este usuario' });
    }
    res.status(200).json(tokens);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener tokens por usuario' });
  }
}

/**
 * @swagger
 * /tokens-iniciales-acceso/token-acceso:
 *   get:
 *     summary: Obtener un token por token_acceso
 *     tags:
 *       - tokensInicialesAcceso
 *     parameters:
 *       - name: token_acceso
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Token de acceso a buscar
 *     responses:
 *       200:
 *         description: Token encontrado
 *       404:
 *         description: Token no encontrado
 *       500:
 *         description: Error al obtener el token
 */


export async function getTokenByTokenAcceso(req: Request, res: Response) {
  try {
    const token_acceso = req.query.token_acceso as string;

    if (!token_acceso) {
      return res.status(400).json({ error: 'token_acceso es requerido en la query' });
    }

    const [token] = await db
      .select()
      .from(tokensInicialesAccesoTable)
      .where(eq(tokensInicialesAccesoTable.token_acceso, token_acceso));

    if (!token) {
      return res.status(404).json({ error: 'Token no encontrado en la bd' });
    }

    res.status(200).json(token);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al obtener token en la bd' });
  }
}


/**
 * @swagger
 * /tokens-iniciales-acceso/{id}:
 *   put:
 *     summary: Actualizar un token inicial de acceso por ID
 *     tags: [tokensInicialesAcceso]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del token inicial de acceso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               usado:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Token actualizado exitosamente
 *       404:
 *         description: Token no encontrado
 *       500:
 *         description: Error al actualizar el token
 */


export async function updateTokenInicialAcceso(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [updated] = await db
      .update(tokensInicialesAccesoTable)
      .set(req.cleanBody)
      .where(eq(tokensInicialesAccesoTable.id, id))
      .returning();

    if (!updated) {
      return res.status(404).json({ error: 'Token no encontrado' });
    }

    res.status(200).json(updated);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al actualizar token' });
  }
}

export async function deleteTokenInicialAcceso(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db
      .delete(tokensInicialesAccesoTable)
      .where(eq(tokensInicialesAccesoTable.id, id))
      .returning();

    if (!deleted) {
      return res.status(404).json({ error: 'Token no encontrado' });
    }

    res.status(200).json({ message: 'Token eliminado correctamente' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'Error al eliminar token' });
  }
}
