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
import { logger, LogCategory, LogComponent } from '../../utils/logger';
import { DatabaseLogger } from '../../utils/databaseLogger';

const router = Router();

export const generateUserToken = (user: any) => {
	logger.business(
		'JWT_TOKEN_GENERATION',
		'Generating authentication token',
		{
			userId: user.id,
			rol_id: user.rol_id,
			tokenType: 'authentication',
			expiresIn: '30d',
		},
		{
			category: LogCategory.AUTH,
			component: LogComponent.SERVICE,
			action: 'TOKEN_GENERATION',
			userId: user.id,
		}
	);

	const token = jwt.sign(
		{ userId: user.id, rol_id: user.rol_id },
		'your-secret',
		{
			expiresIn: '30d',
		}
	);

	logger.audit('AUTH_TOKEN_CREATED', 'authentication', user.id, user.id, {
		tokenType: 'JWT',
		expiresIn: '30d',
		rol_id: user.rol_id,
	});

	return token;
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
router.post(
	'/register',
	validateData(insertUsuarioSchema),
	async (req, res) => {
		const startTime = Date.now();
		const requestId = req.headers['x-request-id'] as string;

		try {
			const data = req.cleanBody;
			const clientIP = req.ip || req.connection.remoteAddress;

			logger.business(
				'USER_REGISTRATION_START',
				'User registration process initiated',
				{
					correo: data.correo,
					nombre: data.nombre,
					universidad_id: data.universidad_id,
					rol_id: data.rol_id,
					hasOptionalData: {
						telefono: !!data.telefono,
						github_url: !!data.github_url,
						linkedin_url: !!data.linkedin_url,
						biografia: !!data.biografia,
					},
					ip: clientIP,
				},
				{
					category: LogCategory.BUSINESS,
					component: LogComponent.CONTROLLER,
					action: 'USER_REGISTRATION',
					requestId,
				}
			);

			// Verificar si el usuario ya existe
			logger.debug(
				'Checking for existing user',
				{
					correo: data.correo,
				},
				{
					category: LogCategory.DATABASE,
					component: LogComponent.CONTROLLER,
					action: 'DUPLICATE_CHECK',
				}
			);

			const existingUser = await DatabaseLogger.logSelect(
				() =>
					db
						.select()
						.from(usuariosTable)
						.where(eq(usuariosTable.correo, data.correo)),
				'usuarios',
				'Check for existing email',
				{ correo: data.correo }
			);

			if (existingUser.length > 0) {
				logger.warn(
					'Registration attempt with existing email',
					{
						correo: data.correo,
						existingUserId: existingUser[0].id,
						ip: clientIP,
					},
					{
						category: LogCategory.BUSINESS,
						component: LogComponent.CONTROLLER,
						action: 'DUPLICATE_REGISTRATION_ATTEMPT',
					}
				);

				logger.security('DUPLICATE_REGISTRATION_ATTEMPT', 'LOW', {
					correo: data.correo,
					ip: clientIP,
					userAgent: req.get('User-Agent'),
				});

				return res.status(409).json({
					error: 'Email already registered',
					code: 'EMAIL_EXISTS',
					requestId,
				});
			}

			// Hash de la contraseña con logging de performance
			const hashStartTime = Date.now();
			logger.debug(
				'Password hashing started',
				{
					algorithm: 'bcrypt',
					rounds: 10,
				},
				{
					category: LogCategory.SECURITY,
					component: LogComponent.SERVICE,
					action: 'PASSWORD_HASH',
				}
			);

			data.contrasena = await bcrypt.hash(data.contrasena, 10);
			const hashDuration = Date.now() - hashStartTime;

			logger.debug(
				'Password hashing completed',
				{
					duration: `${hashDuration}ms`,
					performance:
						hashDuration < 100
							? 'FAST'
							: hashDuration < 300
							? 'NORMAL'
							: 'SLOW',
				},
				{
					category: LogCategory.SECURITY,
					component: LogComponent.SERVICE,
					action: 'PASSWORD_HASH_COMPLETE',
				}
			);

			// Insertar usuario en base de datos con logging detallado
			logger.business('USER_CREATION', 'Creating new user record', {
				userData: {
					correo: data.correo,
					nombre: data.nombre,
					universidad_id: data.universidad_id,
					rol_id: data.rol_id,
					matricula: data.matricula,
					hasOptionalFields: Object.keys(data).filter(
						(key) =>
							![
								'correo',
								'nombre',
								'contrasena',
								'universidad_id',
								'rol_id',
							].includes(key)
					).length,
				},
			});

			const [user] = await DatabaseLogger.logInsert(
				() => db.insert(usuariosTable).values(data).returning(),
				'usuarios',
				data,
				undefined // No userId available yet
			);

			// Sanitizar datos de usuario para respuesta
			const userWithoutPassword = {
				...user,
				contrasena: undefined,
			};

			// Generar token con logging detallado
			const token = generateUserToken(userWithoutPassword);

			const duration = Date.now() - startTime;

			logger.business(
				'USER_REGISTRATION_SUCCESS',
				'User registration completed successfully',
				{
					userId: user.id,
					correo: user.correo,
					nombre: user.nombre,
					universidad_id: user.universidad_id,
					rol_id: user.rol_id,
					duration: `${duration}ms`,
					performance: {
						total: `${duration}ms`,
						passwordHash: `${hashDuration}ms`,
						category:
							duration < 500 ? 'FAST' : duration < 1000 ? 'NORMAL' : 'SLOW',
					},
				},
				{
					category: LogCategory.BUSINESS,
					component: LogComponent.CONTROLLER,
					action: 'USER_REGISTRATION_SUCCESS',
					userId: user.id,
				}
			);

			// Log de auditoría para nueva cuenta
			logger.audit('USER_ACCOUNT_CREATED', 'user', user.id, user.id, {
				correo: user.correo,
				nombre: user.nombre,
				universidad_id: user.universidad_id,
				rol_id: user.rol_id,
				ip: clientIP,
				userAgent: req.get('User-Agent'),
			});

			// Log de seguridad para nueva cuenta
			logger.security('NEW_ACCOUNT_CREATED', 'LOW', {
				userId: user.id,
				correo: user.correo,
				rol_id: user.rol_id,
				ip: clientIP,
				registrationDuration: `${duration}ms`,
			});

			res.status(201).json({
				token,
				user: userWithoutPassword,
				requestId,
				timestamp: new Date().toISOString(),
			});
		} catch (e) {
			const duration = Date.now() - startTime;
			const error = e as Error;

			logger.error(
				'User registration failed',
				error,
				{
					correo: req.cleanBody?.correo,
					duration: `${duration}ms`,
					errorType: error.constructor.name,
					requestId,
					ip: req.ip || req.connection.remoteAddress,
					userAgent: req.get('User-Agent'),
				},
				{
					category: LogCategory.ERROR,
					component: LogComponent.CONTROLLER,
					action: 'USER_REGISTRATION_ERROR',
				}
			);

			// Log de seguridad para errores de registro
			logger.security('REGISTRATION_ERROR', 'MEDIUM', {
				error: error.message,
				correo: req.cleanBody?.correo,
				ip: req.ip || req.connection.remoteAddress,
				duration: `${duration}ms`,
			});

			// Respuesta de error más detallada en desarrollo
			const isDevelopment = process.env.NODE_ENV === 'development';

			res.status(500).json({
				error: 'Registration failed',
				code: 'REGISTRATION_ERROR',
				requestId,
				timestamp: new Date().toISOString(),
				...(isDevelopment && {
					details: error.message,
					stack: error.stack,
				}),
			});
		}
	}
);

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
	const startTime = Date.now();

	try {
		const { correo, contrasena } = req.cleanBody;

		logger.info('[AUTH] User login attempt', {
			correo,
			ip: req.ip,
			userAgent: req.get('User-Agent'),
		});

		// Buscar usuario por correo
		const [user] = await DatabaseLogger.logSelect(
			() =>
				db.select().from(usuariosTable).where(eq(usuariosTable.correo, correo)),
			'usuarios',
			'finding user by email',
			{ correo }
		);

		if (!user) {
			const duration = Date.now() - startTime;
			logger.warn('[AUTH] Login failed - User not found', {
				correo,
				ip: req.ip,
				duration: `${duration}ms`,
			});
			res.status(401).json({ error: 'Authentication failed' });
			return;
		}

		// Verificar contraseña
		logger.debug('[AUTH] Verifying password');
		const matched = await bcrypt.compare(contrasena, user.contrasena);
		if (!matched) {
			const duration = Date.now() - startTime;
			logger.warn('[AUTH] Login failed - Invalid password', {
				userId: user.id,
				correo,
				ip: req.ip,
				duration: `${duration}ms`,
			});
			res.status(401).json({ error: 'Authentication failed' });
			return;
		}

		const token = generateUserToken(user);
		// @ts-ignore
		delete user.contrasena;

		const duration = Date.now() - startTime;
		logger.info('[AUTH] Login successful', {
			userId: user.id,
			correo: user.correo,
			nombre: user.nombre,
			rol_id: user.rol_id,
			duration: `${duration}ms`,
		});

		res.status(200).json({ token, user });
	} catch (e) {
		const duration = Date.now() - startTime;
		logger.error('[AUTH] Login error', e as Error, {
			correo: req.cleanBody?.correo,
			duration: `${duration}ms`,
		});
		res.status(500).send('Something went wrong');
	}
});

export default router;
