// src/routes/usuarios/usuariosController.ts
import { Request, Response } from 'express';
import { db } from '../../db';
import { usuariosTable } from '../../db/usuariosSchema';
import { tokensInicialesAccesoTable } from '../../db/tokensInicialesAccesoSchema';
import { enviarTokenPorCorreo } from '../../utils/mailer'
import { eq } from 'drizzle-orm';

async function getUsuarioById(id: number) {
  const [usuario] = await db.select().from(usuariosTable).where(eq(usuariosTable.id, id));
  return usuario;
}

export async function esAdminUni(userId: number): Promise<boolean> {
  const usuario = await getUsuarioById(userId);
  return usuario?.rol_id === 9;
}


/**
 * @swagger
 * /usuarios/alumnos:
 *   post:
 *     summary: Registrar un nuevo alumno (solo admin uni)
 *     tags: [usuarios]
 *     security:
 *       - bearerAuth: []
 *     description: |
 *       Permite al usuario con rol `admin uni` (rol_id = 9) registrar nuevos alumnos (`rol_id = 2`).<br/>
 *       El token de acceso es generado automáticamente por la base de datos y se envía por correo al alumno.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - nombre
 *             properties:
 *               nombre:
 *                 type: string
 *                 example: Juan Pérez
 *               correo:
 *                 type: string
 *                 example: juan@example.com
 *               telefono:
 *                 type: string
 *                 example: 5551234567
 *     responses:
 *       201:
 *         description: Alumno creado y token enviado por correo
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Alumno creado y token enviado por correo
 *       400:
 *         description: El rol enviado no es válido (debe ser 2)
 *       403:
 *         description: No autorizado. Solo el admin uni puede registrar alumnos.
 *       500:
 *         description: Error al crear alumno o al enviar el token
 */

export async function createAlumnoByAdminUni(req: Request, res: Response) {
  try {
    const adminId = req.userId;
    if (!adminId || !(await esAdminUni(Number(adminId)))) {
      return res.status(403).json({ error: 'No autorizado. Solo el admin uni puede registrar alumnos.' });
    }

    // Obtener los datos del admin para tomar su universidad_id
    const [admin] = await db
      .select({ universidad_id: usuariosTable.universidad_id })
      .from(usuariosTable)
      .where(eq(usuariosTable.id, Number(adminId)));

    if (!admin?.universidad_id) {
      return res.status(500).json({ error: 'No se pudo determinar la universidad del administrador' });
    }

    const data = req.cleanBody;

    // Forzar los valores fijos
    data.rol_id = 2;
    data.universidad_id = admin.universidad_id;

    const [alumno] = await db.insert(usuariosTable).values(data).returning();

    // Buscar el token que fue generado por el trigger
    const [tokenRow] = await db
      .select()
      .from(tokensInicialesAccesoTable)
      .where(eq(tokensInicialesAccesoTable.usuario_id, alumno.id));

    if (!tokenRow?.token_acceso) {
      return res.status(500).json({ error: 'No se encontró el token generado para este alumno.' });
    }

    if (!alumno.correo) {
      throw new Error('El correo del alumno es nulo o indefinido');
    }

    await enviarTokenPorCorreo(alumno.correo, tokenRow.token_acceso);
    //await enviarTokenPorCorreo('lidering.esteban@gmail.com', 'tokenRow.token_acceso');

    res.status(201).json({ message: 'Alumno creado y token enviado por correo', alumno });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear alumno' });
  }
}






/**
 * @swagger
 * tags:
 *   name: usuarios
 *   description: Endpoints para la gestión de usuarios
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     summary: Crear un nuevo usuario
 *     tags: [usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - rol_id
 *               - universidad_id
 *             properties:
 *               correo:
 *                 type: string
 *               rol_id:
 *                 type: integer
 *               universidad_id:
 *                 type: integer
 *               telefono:
 *                 type: string
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario creado exitosamente
 *       500:
 *         description: Error al crear usuario
 */
export async function createUsuario(req: Request, res: Response) {
  try {
    const data = req.cleanBody;
    const [nuevo] = await db.insert(usuariosTable).values(data).returning();
    res.status(201).json(nuevo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
}

/**
 * @swagger
 * /usuarios:
 *   get:
 *     summary: Obtener todos los usuarios
 *     tags: [usuarios]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 *       500:
 *         description: Error al obtener usuarios
 */
export async function listUsuarios(_req: Request, res: Response) {
  try {
    const usuarios = await db.select().from(usuariosTable);
    res.status(200).json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
}

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     summary: Obtener usuario por ID
 *     tags: [usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al obtener usuario
 */
export async function getUsuario(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [usuario] = await db.select().from(usuariosTable).where(eq(usuariosTable.id, id));
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json(usuario);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener usuario' });
  }
}

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     summary: Actualizar un usuario existente
 *     tags: [usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID del usuario
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               correo:
 *                 type: string
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               telefono:
 *                 type: string
 *               universidad_id:
 *                 type: integer
 *               rol_id:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado exitosamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al actualizar usuario
 */
export async function updateUsuario(req: Request, res: Response) {
   try {
    const id = parseInt(req.params.id);
    const data = req.cleanBody;

    // Si viene contraseña, la hasheamos
    if (data.contrasena) {
      data.contrasena = await bcrypt.hash(data.contrasena, 10); // Mismo costo que en registro
    }

    const [updatedUser] = await db
      .update(usuariosTable)
      .set(data)
      .where(eq(usuariosTable.id, id))
      .returning();

    if (!updatedUser) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // Eliminamos la contraseña de la respuesta
    const { contrasena, ...safeUser } = updatedUser;

    res.status(200).json(safeUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Error al actualizar usuario' });
  }
}


/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     summary: Eliminar usuario por ID
 *     tags: [usuarios]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
 *       404:
 *         description: Usuario no encontrado
 *       500:
 *         description: Error al eliminar usuario
 */
export async function deleteUsuario(req: Request, res: Response) {
  try {
    const id = parseInt(req.params.id);
    const [deleted] = await db.delete(usuariosTable).where(eq(usuariosTable.id, id)).returning();
    if (!deleted) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar usuario' });
  }
}
