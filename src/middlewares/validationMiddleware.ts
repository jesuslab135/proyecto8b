import { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import { z, ZodError } from 'zod';
import { logger, LogCategory, LogComponent } from '../utils/logger';

export function validateData(schema: z.ZodObject<any, any>) {
	return (req: Request, res: Response, next: NextFunction) => {
		const startTime = Date.now();
		const schemaKeys = Object.keys(schema.shape);
		const bodyKeys = Object.keys(req.body || {});
		const userId = req.userId as number;

		logger.debug(
			'Data validation started',
			{
				url: req.originalUrl,
				method: req.method,
				userId,
				bodyKeys,
				schemaKeys,
				bodySize: JSON.stringify(req.body || {}).length,
				expectedFields: schemaKeys.length,
				receivedFields: bodyKeys.length,
			},
			{
				category: LogCategory.VALIDATION,
				component: LogComponent.VALIDATOR,
				action: 'VALIDATION_START',
			}
		);

		try {
			// Validar datos contra el schema
			const validatedData = schema.parse(req.body);
			req.cleanBody = _.pick(req.body, schemaKeys);

			const duration = Date.now() - startTime;

			// Análisis de la validación exitosa
			const validationAnalysis = {
				fieldsValidated: schemaKeys.length,
				fieldsReceived: bodyKeys.length,
				extraFields: bodyKeys.filter((key) => !schemaKeys.includes(key)),
				missingOptionalFields: schemaKeys.filter(
					(key) => schema.shape[key].isOptional() && !(key in req.body)
				),
			};

			logger.info(
				'Data validation successful',
				{
					url: req.originalUrl,
					method: req.method,
					userId,
					duration: `${duration}ms`,
					validatedFields: Object.keys(req.cleanBody),
					validationAnalysis,
					performance:
						duration < 10 ? 'FAST' : duration < 50 ? 'NORMAL' : 'SLOW',
				},
				{
					category: LogCategory.VALIDATION,
					component: LogComponent.VALIDATOR,
					action: 'VALIDATION_SUCCESS',
				}
			);

			// Log de auditoría para validación exitosa en operaciones sensibles
			if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(req.method)) {
				logger.audit('DATA_VALIDATED', 'validation', 'schema', userId, {
					url: req.originalUrl,
					method: req.method,
					fieldsValidated: schemaKeys.length,
				});
			}

			// Alertas para validaciones lentas
			if (duration > 100) {
				logger.warn(
					'Slow validation detected',
					{
						url: req.originalUrl,
						duration: `${duration}ms`,
						schemaComplexity: schemaKeys.length,
						dataSize: JSON.stringify(req.body).length,
					},
					{
						category: LogCategory.PERFORMANCE,
						component: LogComponent.VALIDATOR,
						action: 'SLOW_VALIDATION',
					}
				);
			}

			next();
		} catch (error) {
			const duration = Date.now() - startTime;

			if (error instanceof ZodError) {
				// Análisis detallado de errores de validación
				const errorAnalysis = {
					totalErrors: error.issues.length,
					errorTypes: [...new Set(error.issues.map((issue) => issue.code))],
					affectedFields: [
						...new Set(error.issues.map((issue) => issue.path.join('.'))),
					],
					severityLevel: error.issues.some((issue) =>
						['required', 'invalid_type'].includes(issue.code)
					)
						? 'HIGH'
						: 'MEDIUM',
				};

				const errorMessages = error.issues.map((issue: any) => ({
					field: issue.path.join('.') || 'root',
					code: issue.code,
					message: issue.message,
					received: issue.received,
					expected: issue.expected,
					path: issue.path,
				}));

				logger.warn(
					'Data validation failed',
					{
						url: req.originalUrl,
						method: req.method,
						userId,
						duration: `${duration}ms`,
						errorAnalysis,
						errors: errorMessages,
						receivedDataStructure: analyzeDataStructure(req.body),
						expectedSchema: getSchemaStructure(schema),
					},
					{
						category: LogCategory.VALIDATION,
						component: LogComponent.VALIDATOR,
						action: 'VALIDATION_FAILED',
					}
				);

				// Log de seguridad para intentos de inyección o datos maliciosos
				const suspiciousPatterns = detectSuspiciousPatterns(req.body);
				if (suspiciousPatterns.length > 0) {
					logger.security('SUSPICIOUS_DATA_PATTERNS', 'MEDIUM', {
						url: req.originalUrl,
						method: req.method,
						userId,
						patterns: suspiciousPatterns,
						ip: req.ip || req.connection.remoteAddress,
						userAgent: req.get('User-Agent'),
					});
				}

				// Auditoría para validaciones fallidas en operaciones críticas
				if (['POST', 'PUT', 'PATCH'].includes(req.method)) {
					logger.audit(
						'DATA_VALIDATION_FAILED',
						'validation',
						'schema',
						userId,
						{
							url: req.originalUrl,
							method: req.method,
							errorCount: error.issues.length,
							failedFields: errorAnalysis.affectedFields,
						}
					);
				}

				res.status(400).json({
					error: 'Validation failed',
					code: 'VALIDATION_ERROR',
					details: errorMessages,
					summary: {
						totalErrors: errorAnalysis.totalErrors,
						affectedFields: errorAnalysis.affectedFields.length,
						errorTypes: errorAnalysis.errorTypes,
					},
					requestId: req.headers['x-request-id'],
					timestamp: new Date().toISOString(),
				});
			} else {
				// Error inesperado durante la validación
				logger.error(
					'Unexpected validation error',
					error as Error,
					{
						url: req.originalUrl,
						method: req.method,
						userId,
						duration: `${duration}ms`,
						errorType: (error as Error).constructor.name,
						schemaKeys,
						bodyKeys,
					},
					{
						category: LogCategory.ERROR,
						component: LogComponent.VALIDATOR,
						action: 'VALIDATION_ERROR',
					}
				);

				logger.security('VALIDATION_SYSTEM_ERROR', 'HIGH', {
					url: req.originalUrl,
					method: req.method,
					userId,
					error: (error as Error).message,
					ip: req.ip || req.connection.remoteAddress,
				});

				res.status(500).json({
					error: 'Internal validation error',
					code: 'VALIDATION_SYSTEM_ERROR',
					requestId: req.headers['x-request-id'],
					timestamp: new Date().toISOString(),
				});
			}
		}
	};
}

// Métodos auxiliares para análisis de datos
function analyzeDataStructure(data: any): any {
	if (!data) return { type: 'null', size: 0 };

	if (Array.isArray(data)) {
		return {
			type: 'array',
			length: data.length,
			elementTypes: [...new Set(data.map((item) => typeof item))],
			size: JSON.stringify(data).length,
		};
	}

	if (typeof data === 'object') {
		return {
			type: 'object',
			properties: Object.keys(data).length,
			propertyTypes: Object.entries(data).reduce((acc, [key, value]) => {
				acc[key] = typeof value;
				return acc;
			}, {} as Record<string, string>),
			size: JSON.stringify(data).length,
		};
	}

	return {
		type: typeof data,
		value: String(data).substring(0, 100),
		size: String(data).length,
	};
}

function getSchemaStructure(schema: z.ZodObject<any, any>): any {
	const shape = schema.shape;
	const structure: Record<string, any> = {};

	Object.entries(shape).forEach(([key, zodType]) => {
		structure[key] = {
			type: (zodType as any)._def?.typeName || 'unknown',
			optional: (zodType as any).isOptional(),
			nullable: (zodType as any).isNullable(),
		};
	});

	return structure;
}

function detectSuspiciousPatterns(data: any): string[] {
	const patterns: string[] = [];
	const dataStr = JSON.stringify(data).toLowerCase();

	// Patrones SQL injection
	const sqlPatterns = [
		/union\s+select/i,
		/drop\s+table/i,
		/delete\s+from/i,
		/insert\s+into/i,
		/update\s+set/i,
		/'.*or.*'.*=/i,
		/--/,
		/\/\*.*\*\//,
	];

	// Patrones XSS
	const xssPatterns = [
		/<script/i,
		/javascript:/i,
		/on\w+\s*=/i,
		/<iframe/i,
		/eval\s*\(/i,
	];

	// Patrones de path traversal
	const pathPatterns = [
		/\.\.\//,
		/\.\.\\/,
		/\/etc\/passwd/i,
		/\/windows\/system32/i,
	];

	sqlPatterns.forEach((pattern) => {
		if (pattern.test(dataStr)) patterns.push('SQL_INJECTION');
	});

	xssPatterns.forEach((pattern) => {
		if (pattern.test(dataStr)) patterns.push('XSS_ATTEMPT');
	});

	pathPatterns.forEach((pattern) => {
		if (pattern.test(dataStr)) patterns.push('PATH_TRAVERSAL');
	});

	// Detectar strings excesivamente largos
	if (dataStr.length > 10000) {
		patterns.push('OVERSIZED_DATA');
	}

	// Detectar caracteres de control o caracteres extraños
	if (/[\x00-\x1f\x7f-\x9f]/.test(dataStr)) {
		patterns.push('CONTROL_CHARACTERS');
	}

	return [...new Set(patterns)];
}