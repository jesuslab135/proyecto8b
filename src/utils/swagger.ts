// src/swagger.ts
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options = {
	definition: {
		openapi: '3.0.0',
		info: {
			title: 'UniON API',
			version: '1.0.0',
			description: 'Documentación de los endpoints del sistema UniON',
		},
		components: {
			securitySchemes: {
				bearerAuth: {
					type: 'http',
					scheme: 'bearer',
					bearerFormat: 'JWT',
				},
			},
		},
		security: [{ bearerAuth: [] }],
		tags: [
			{ name: 'auth', description: 'Autenticación y registro de usuarios' },
			{
				name: 'ActividadUsuario',
				description: 'Operaciones de actividad de usuario',
			},
			{
				name: 'asistenciasEvento',
				description: 'Operaciones de asistencias a eventos',
			},
			{ name: 'bloques', description: 'Operaciones de bloques' },
			{ name: 'conversaciones', description: 'Operaciones de conversaciones' },
			{ name: 'eventos', description: 'Operaciones de eventos' },
			{
				name: 'experienciaUsuario',
				description: 'Operaciones de experiencia de usuario',
			},
			{ name: 'foros', description: 'Operaciones de foros' },
			{ name: 'hilos', description: 'Operaciones de hilos' },
			{ name: 'mensajes', description: 'Operaciones de mensajes' },
			{
				name: 'ofertasLaborales',
				description: 'Operaciones de ofertas laborales',
			},
			{ name: 'oportunidades', description: 'Operaciones de oportunidades' },
			{
				name: 'paginasColaborativas',
				description: 'Operaciones de páginas colaborativas',
			},
			{
				name: 'participacionesProyecto',
				description: 'Operaciones de participaciones en proyectos',
			},
			{ name: 'perfiles', description: 'Operaciones de perfiles' },
			{ name: 'postulaciones', description: 'Operaciones de postulaciones' },
			{
				name: 'postulacionesLaborales',
				description: 'Operaciones de postulaciones laborales',
			},
			{ name: 'proyectos', description: 'Operaciones de proyectos' },
			{
				name: 'proyectosValidaciones',
				description: 'Operaciones de validaciones de proyectos',
			},
			{
				name: 'relacionesBloques',
				description: 'Operaciones de relaciones entre bloques',
			},
			{ name: 'reportes', description: 'Operaciones de reportes' },
			{
				name: 'respuestasHilo',
				description: 'Operaciones de respuestas en hilos',
			},
			{
				name: 'rolesProyecto',
				description: 'Operaciones de roles en proyectos',
			},
			{ name: 'rolesUsuario', description: 'Operaciones de roles de usuario' },
			{ name: 'seguimientos', description: 'Operaciones de seguimientos' },
			{ name: 'taggables', description: 'Operaciones de taggables' },
			{ name: 'tags', description: 'Operaciones de tags' },
			{ name: 'universidades', description: 'Operaciones de universidades' },
			{ name: 'usuarios', description: 'Operaciones de usuarios' },
			{
				name: 'versionesBloques',
				description: 'Operaciones de versiones de bloques',
			},
			{
				name: 'adminBackup',
				description:
					'Operaciones de respaldo y restauración de base de datos para administradores',
			},
		],
		servers: [
			// En producción, priorizar la URL de Koyeb
			...(process.env.NODE_ENV === 'production'
				? [
						{
							url: process.env.API_BASE_URL
								? process.env.API_BASE_URL.startsWith('http')
									? process.env.API_BASE_URL
									: `https://${process.env.API_BASE_URL}`
								: 'https://curious-bernie-union-196dcdb6.koyeb.app/api',
							description: '🚀 Servidor de Producción (Koyeb)',
						},
						{
							url: 'http://localhost:3000/api',
							description: '🏠 Localhost (Para testing local)',
						},
				  ]
				: [
						// En desarrollo, mostrar todas las opciones locales
						{
							url: 'http://localhost:3000/api',
							description: '🏠 Servidor Local - Puerto 3000',
						},
						{
							url: 'http://localhost:8000/api',
							description: '🏠 Servidor Local - Puerto 8000',
						},
				  ]),
		],
	},
	apis: ['./src/routes/**/*.ts'], // siempre correcto // Ajusta si tus rutas están en otro path
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
