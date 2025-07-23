import { Router } from 'express';
import {
  insertUsuarioSchema,
  loginSchema,
  usuariosTable,
} from '../../db/usuariosSchema';
import { validateData } from '../../middlewares/validationMiddleware';
import bcrypt from 'bcryptjs';
import { db } from '../../db/index';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

const router = Router();

const generateUserToken = (user: any) => {
<<<<<<< HEAD
  return jwt.sign({ userId: user.id, rol_id: user.rol_id }, 'your-secret', {
=======
  return jwt.sign({ userId: user.id, role: user.role }, 'your-secret', {
>>>>>>> b6959c3 (actualizacion)
    expiresIn: '30d',
  });
};

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Registrar un nuevo usuario
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nombre
 *               - correo
 *               - contrasena
 *               - rol_id
 *               - universidad_id
 *             properties:
 *               nombre:
 *                 type: string
 *               correo:
 *                 type: string
 *               contrasena:
 *                 type: string
 *               rol_id:
 *                 type: integer
 *               universidad_id:
 *                 type: integer
 *               matricula:
 *                 type: string
 *               telefono:
 *                 type: string
 *               github_url:
 *                 type: string
 *               linkedin_url:
 *                 type: string
 *               biografia:
 *                 type: string
 *               cv_url:
 *                 type: string
 *               cv_publico:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Usuario creado y token generado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 */
router.post('/register', validateData(insertUsuarioSchema), async (req, res) => {
  try {
<<<<<<< HEAD
    const {id, ...data} = req.cleanBody;
    data.contrasena = await bcrypt.hash(data.contrasena, 10);
=======
    const data = req.cleanBody;
    console.log('Datos recibidos:', data);
    data.password = await bcrypt.hash(data.password, 10);
>>>>>>> b6959c3 (actualizacion)

    const [user] = await db.insert(usuariosTable).values(data).returning();

    // @ts-ignore
<<<<<<< HEAD
    delete user.contrasena;
    const token = generateUserToken(user);

    res.status(201).json({ token, user });
=======
    delete user.password;
    const token = generateUserToken(user);

    res.status(201).json({ user, token });
>>>>>>> b6959c3 (actualizacion)
  } catch (e) {
    console.log(e);
    res.status(500).send('Something went wrong');
  }
});

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Iniciar sesión con correo y contraseña
 *     tags: [auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - correo
 *               - contrasena
 *             properties:
 *               correo:
 *                 type: string
 *               contrasena:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                 user:
 *                   type: object
 *       401:
 *         description: Fallo de autenticación
 */
router.post('/login', validateData(loginSchema), async (req, res) => {
  try {
    const { correo, contrasena } = req.cleanBody;

    const [user] = await db
      .select()
      .from(usuariosTable)
      .where(eq(usuariosTable.correo, correo));
    if (!user) {
      res.status(401).json({ error: 'Authentication failed' });
      return;
    }

    const matched = await bcrypt.compare(contrasena, user.contrasena);
    if (!matched) {
      res.status(401).json({ error: 'Authentication failed' });
      return;
    }

<<<<<<< HEAD
    const token = generateUserToken(user);
    // @ts-ignore
    delete user.contrasena;
=======
    // create a jwt token
    const token = generateUserToken(user);
    // @ts-ignore
    delete user.password;
>>>>>>> b6959c3 (actualizacion)
    res.status(200).json({ token, user });
  } catch (e) {
    res.status(500).send('Something went wrong');
  }
});

export default router;
