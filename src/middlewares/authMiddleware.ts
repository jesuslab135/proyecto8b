import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { logger, LogCategory, LogComponent } from '../utils/logger';

export function verifyToken(req: Request, res: Response, next: NextFunction) {
	const startTime = Date.now();
	const authHeader = req.header('Authorization');
	const clientIP = req.ip || req.connection.remoteAddress || 'Unknown';
	const userAgent = req.get('User-Agent') || 'Unknown';

	logger.authentication('TOKEN_VERIFICATION_START', undefined, true, {
		url: req.originalUrl,
		method: req.method,
		hasAuthHeader: !!authHeader,
		ip: clientIP,
		userAgent,
	});

	if (!authHeader || !authHeader.startsWith('Bearer ')) {
		const duration = Date.now() - startTime;

		logger.authentication('TOKEN_MISSING_OR_INVALID', undefined, false, {
			url: req.originalUrl,
			authHeaderPresent: !!authHeader,
			authHeaderFormat: authHeader ? 'Invalid format' : 'Missing',
			ip: clientIP,
			userAgent,
			duration: `${duration}ms`,
		});

		// Log de seguridad para intento de acceso sin autorización
		logger.security('UNAUTHORIZED_ACCESS_ATTEMPT', 'MEDIUM', {
			url: req.originalUrl,
			method: req.method,
			ip: clientIP,
			userAgent,
			reason: 'Missing or invalid Authorization header',
		});

		return res.status(401).json({
			error: 'Access denied',
			code: 'MISSING_TOKEN',
			requestId: req.headers['x-request-id'],
		});
	}

	const token = authHeader.split(' ')[1];

	try {
		// Decode JWT token data
		const decoded = jwt.verify(token, 'your-secret');

		if (typeof decoded !== 'object' || !decoded?.userId) {
			const duration = Date.now() - startTime;

			logger.authentication('TOKEN_INVALID_STRUCTURE', undefined, false, {
				url: req.originalUrl,
				decodedType: typeof decoded,
				hasUserId: !!(decoded as any)?.userId,
				ip: clientIP,
				duration: `${duration}ms`,
			});

			logger.security('INVALID_TOKEN_STRUCTURE', 'MEDIUM', {
				url: req.originalUrl,
				method: req.method,
				ip: clientIP,
				tokenStructure: typeof decoded,
			});

			return res.status(401).json({
				error: 'Access denied',
				code: 'INVALID_TOKEN',
				requestId: req.headers['x-request-id'],
			});
		}

		req.userId = decoded.userId;
		req.rol_id = decoded.rol_id;

		const duration = Date.now() - startTime;

		logger.authentication('TOKEN_VERIFICATION_SUCCESS', decoded.userId, true, {
			userId: decoded.userId,
			rol_id: decoded.rol_id,
			url: req.originalUrl,
			method: req.method,
			ip: clientIP,
			duration: `${duration}ms`,
			tokenAge: decoded.iat
				? `${Math.floor(Date.now() / 1000 - decoded.iat)}s`
				: 'unknown',
		});

		// Log de auditoría para acceso exitoso
		logger.audit(
			'ACCESS_GRANTED',
			'authentication',
			decoded.userId,
			decoded.userId,
			{
				url: req.originalUrl,
				method: req.method,
				rol_id: decoded.rol_id,
			}
		);

		next();
	} catch (e) {
		const duration = Date.now() - startTime;
		const error = e as Error;

		logger.authentication(
			'TOKEN_VERIFICATION_FAILED',
			undefined,
			false,
			{
				url: req.originalUrl,
				method: req.method,
				errorName: error.name,
				errorMessage: error.message,
				ip: clientIP,
				userAgent,
				duration: `${duration}ms`,
			},
			error
		);

		// Determinar severidad basada en el tipo de error
		let severity: 'LOW' | 'MEDIUM' | 'HIGH' = 'MEDIUM';
		if (error.name === 'TokenExpiredError') {
			severity = 'LOW';
		} else if (error.name === 'JsonWebTokenError') {
			severity = 'MEDIUM';
		} else {
			severity = 'HIGH';
		}

		logger.security('TOKEN_VERIFICATION_ERROR', severity, {
			url: req.originalUrl,
			method: req.method,
			ip: clientIP,
			errorType: error.name,
			errorMessage: error.message,
		});

		res.status(401).json({
			error: 'Access denied',
			code:
				error.name === 'TokenExpiredError' ? 'TOKEN_EXPIRED' : 'INVALID_TOKEN',
			requestId: req.headers['x-request-id'],
		});
	}
}

export function verifyAdmin(req: Request, res: Response, next: NextFunction) {
	const startTime = Date.now();
	const role = req.rol_id;
	const userId = req.userId;

	logger.authentication('ADMIN_VERIFICATION_START', userId as number, true, {
		userId,
		rol_id: role,
		url: req.originalUrl,
		method: req.method,
		requiredRole: 1,
	});

	if (role !== 1) {
		const duration = Date.now() - startTime;

		logger.authentication('ADMIN_ACCESS_DENIED', userId as number, false, {
			userId,
			currentRole: role,
			requiredRole: 1,
			url: req.originalUrl,
			method: req.method,
			duration: `${duration}ms`,
		});

		logger.security('PRIVILEGE_ESCALATION_ATTEMPT', 'HIGH', {
			userId,
			currentRole: role,
			attemptedRole: 1,
			url: req.originalUrl,
			method: req.method,
			ip: req.ip || req.connection.remoteAddress,
		});

		return res.status(403).json({
			error: 'Access denied - Admin privileges required',
			code: 'INSUFFICIENT_PRIVILEGES',
			requestId: req.headers['x-request-id'],
		});
	}

	const duration = Date.now() - startTime;

	logger.authentication('ADMIN_VERIFICATION_SUCCESS', userId as number, true, {
		userId,
		url: req.originalUrl,
		method: req.method,
		duration: `${duration}ms`,
	});

	logger.audit(
		'ADMIN_ACCESS_GRANTED',
		'authorization',
		userId as number,
		userId as number,
		{
			url: req.originalUrl,
			method: req.method,
			privilegeLevel: 'ADMIN',
		}
	);

	next();
}

export function verifyUni(req: Request, res: Response, next: NextFunction) {
	const startTime = Date.now();
	const role = req.rol_id;
	const userId = req.userId;

	logger.authentication(
		'UNIVERSITY_VERIFICATION_START',
		userId as number,
		true,
		{
			userId,
			rol_id: role,
			url: req.originalUrl,
			method: req.method,
			requiredRole: 2,
		}
	);

	if (role !== 2) {
		const duration = Date.now() - startTime;

		logger.authentication('UNIVERSITY_ACCESS_DENIED', userId as number, false, {
			userId,
			currentRole: role,
			requiredRole: 2,
			url: req.originalUrl,
			method: req.method,
			duration: `${duration}ms`,
		});

		logger.security('UNAUTHORIZED_UNIVERSITY_ACCESS', 'MEDIUM', {
			userId,
			currentRole: role,
			url: req.originalUrl,
			method: req.method,
			ip: req.ip || req.connection.remoteAddress,
		});

		return res.status(403).json({
			error: 'Access denied - University privileges required',
			code: 'INSUFFICIENT_PRIVILEGES',
			requestId: req.headers['x-request-id'],
		});
	}

	const duration = Date.now() - startTime;

	logger.authentication(
		'UNIVERSITY_VERIFICATION_SUCCESS',
		userId as number,
		true,
		{
			userId,
			url: req.originalUrl,
			method: req.method,
			duration: `${duration}ms`,
		}
	);

	logger.audit(
		'UNIVERSITY_ACCESS_GRANTED',
		'authorization',
		userId as number,
		userId as number,
		{
			url: req.originalUrl,
			method: req.method,
			privilegeLevel: 'UNIVERSITY',
		}
	);

	next();
}