import { Request, Response, NextFunction } from 'express';

// Tipos para el sistema de logging
interface LogLevel {
  name: string;
  value: number;
  color: string;
  icon: string;
}

interface LogEntry {
  timestamp: string;
  level: string;
  category?: string;
  component?: string;
  action?: string;
  method?: string;
  url?: string;
  statusCode?: number;
  responseTime?: number;
  userId?: number;
  userRole?: string;
  userAgent?: string;
  ip?: string;
  requestId?: string;
  correlationId?: string;
  sessionId?: string;
  message: string;
  data?: any;
  error?: Error;
  metadata?: {
    memoryUsage?: NodeJS.MemoryUsage;
    performanceMetrics?: any;
    businessContext?: any;
    securityContext?: any;
  };
}

// Categorías de logging para mejor organización
export enum LogCategory {
  HTTP = 'HTTP',
  DATABASE = 'DATABASE',
  AUTH = 'AUTH',
  VALIDATION = 'VALIDATION',
  BUSINESS = 'BUSINESS',
  SECURITY = 'SECURITY',
  PERFORMANCE = 'PERFORMANCE',
  SYSTEM = 'SYSTEM',
  ERROR = 'ERROR',
  AUDIT = 'AUDIT'
}

// Componentes del sistema
export enum LogComponent {
  API = 'API',
  MIDDLEWARE = 'MIDDLEWARE',
  CONTROLLER = 'CONTROLLER',
  SERVICE = 'SERVICE',
  DATABASE = 'DATABASE',
  AUTH = 'AUTH',
  VALIDATOR = 'VALIDATOR'
}

// Niveles de logging mejorados con iconos
const LOG_LEVELS: Record<string, LogLevel> = {
  ERROR: { name: 'ERROR', value: 0, color: '\x1b[31m', icon: '❌' }, // Rojo
  WARN: { name: 'WARN', value: 1, color: '\x1b[33m', icon: '⚠️' },  // Amarillo
  INFO: { name: 'INFO', value: 2, color: '\x1b[36m', icon: 'ℹ️' },  // Cian
  DEBUG: { name: 'DEBUG', value: 3, color: '\x1b[37m', icon: '🔍' }, // Blanco
  TRACE: { name: 'TRACE', value: 4, color: '\x1b[90m', icon: '🔎' }  // Gris
};

const RESET_COLOR = '\x1b[0m';

class Logger {
  private static instance: Logger;
  private logLevel: number;

  private constructor() {
    this.logLevel = LOG_LEVELS[process.env.LOG_LEVEL || 'INFO'].value;
  }

  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  private shouldLog(level: LogLevel): boolean {
    return level.value <= this.logLevel;
  }

  private formatMessage(entry: LogEntry): string {
    const { 
      timestamp, 
      level, 
      category, 
      component, 
      action,
      method, 
      url, 
      statusCode, 
      responseTime, 
      userId, 
      userRole,
      ip, 
      message, 
      requestId,
      correlationId 
    } = entry;
    
    const logLevel = LOG_LEVELS[level];
    const icon = logLevel?.icon || '';
    
    // Timestamp más legible
    const time = new Date(timestamp).toLocaleTimeString('es-ES', { 
      hour12: false, 
      timeZone: 'America/Mexico_City' 
    });
    
    let formatted = `${icon} [${time}] [${level}]`;
    
    // Agregar categoría y componente
    if (category) {
      formatted += ` [${category}]`;
    }
    
    if (component) {
      formatted += ` [${component}]`;
    }
    
    // IDs de seguimiento
    if (requestId) {
      formatted += ` [REQ:${requestId.slice(-8)}]`; // Solo últimos 8 caracteres
    }
    
    if (correlationId) {
      formatted += ` [CORR:${correlationId.slice(-8)}]`;
    }
    
    // Información HTTP
    if (method && url) {
      formatted += ` ${method} ${url}`;
    }
    
    // Estado de respuesta con colores específicos
    if (statusCode) {
      let statusColor = '';
      if (statusCode >= 500) statusColor = '\x1b[31m'; // Rojo
      else if (statusCode >= 400) statusColor = '\x1b[33m'; // Amarillo
      else if (statusCode >= 300) statusColor = '\x1b[36m'; // Cian
      else if (statusCode >= 200) statusColor = '\x1b[32m'; // Verde
      
      formatted += ` ${statusColor}[${statusCode}]${RESET_COLOR}`;
    }
    
    // Tiempo de respuesta con indicadores de performance
    if (responseTime !== undefined) {
      let timeColor = '';
      if (responseTime > 1000) timeColor = '\x1b[31m';      // Rojo > 1s
      else if (responseTime > 500) timeColor = '\x1b[33m';  // Amarillo > 500ms
      else if (responseTime > 200) timeColor = '\x1b[36m';  // Cian > 200ms
      else timeColor = '\x1b[32m';                          // Verde < 200ms
      
      formatted += ` ${timeColor}[${responseTime}ms]${RESET_COLOR}`;
    }
    
    // Información del usuario
    if (userId) {
      formatted += ` [User:${userId}${userRole ? `(${userRole})` : ''}]`;
    }
    
    // IP con formato más claro
    if (ip) {
      formatted += ` [IP:${ip}]`;
    }
    
    // Acción específica
    if (action) {
      formatted += ` [${action}]`;
    }
    
    // Mensaje principal
    formatted += ` → ${message}`;
    
    return formatted;
  }

  private log(level: LogLevel, message: string, data?: any, error?: Error, context?: Partial<LogEntry>) {
    if (!this.shouldLog(level)) return;

    // Agregar métricas de sistema si es DEBUG o TRACE
    const includeSystemMetrics = level.value >= LOG_LEVELS.DEBUG.value;
    
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level: level.name,
      message,
      data,
      error,
      metadata: includeSystemMetrics ? {
        memoryUsage: process.memoryUsage(),
        performanceMetrics: {
          uptime: process.uptime(),
          timestamp: Date.now()
        }
      } : undefined,
      ...context
    };

    const formattedMessage = this.formatMessage(entry);
    const coloredMessage = `${level.color}${formattedMessage}${RESET_COLOR}`;

    console.log(coloredMessage);

    // Mostrar datos adicionales con mejor formato
    if (data && level.value <= LOG_LEVELS.DEBUG.value) {
      const dataStr = this.formatData(data, level);
      console.log(`${level.color}├─ [DATA]${RESET_COLOR} ${dataStr}`);
    }

    // Mostrar métricas de sistema si están disponibles
    if (entry.metadata?.memoryUsage && level.value >= LOG_LEVELS.TRACE.value) {
      const memory = entry.metadata.memoryUsage;
      console.log(`${level.color}├─ [MEMORY]${RESET_COLOR} RSS: ${(memory.rss / 1024 / 1024).toFixed(2)}MB, Heap: ${(memory.heapUsed / 1024 / 1024).toFixed(2)}MB`);
    }

    // Mostrar stack trace con mejor formato
    if (error && level.value <= LOG_LEVELS.WARN.value) {
      const stack = error.stack?.split('\n').slice(0, 10).join('\n'); // Limitar a 10 líneas
      console.log(`${level.color}└─ [STACK]${RESET_COLOR}\n${stack}`);
    }
  }

  private formatData(data: any, level: LogLevel): string {
    try {
      if (typeof data === 'string') return data;
      if (typeof data === 'number' || typeof data === 'boolean') return String(data);
      
      const json = JSON.stringify(data, null, level.value >= LOG_LEVELS.TRACE.value ? 2 : 0);
      
      // Si es muy largo, truncar
      if (json.length > 500 && level.value < LOG_LEVELS.TRACE.value) {
        return json.substring(0, 500) + '... [truncated]';
      }
      
      return json;
    } catch (e) {
      return '[Unable to serialize data]';
    }
  }

  public error(message: string, error?: Error, data?: any, context?: Partial<LogEntry>) {
    this.log(LOG_LEVELS.ERROR, message, data, error, {
      category: LogCategory.ERROR,
      ...context
    });
  }

  public warn(message: string, data?: any, context?: Partial<LogEntry>) {
    this.log(LOG_LEVELS.WARN, message, data, undefined, context);
  }

  public info(message: string, data?: any, context?: Partial<LogEntry>) {
    this.log(LOG_LEVELS.INFO, message, data, undefined, context);
  }

  public debug(message: string, data?: any, context?: Partial<LogEntry>) {
    this.log(LOG_LEVELS.DEBUG, message, data, undefined, context);
  }

  public trace(message: string, data?: any, context?: Partial<LogEntry>) {
    this.log(LOG_LEVELS.TRACE, message, data, undefined, context);
  }

  // Métodos específicos mejorados para HTTP requests
  public httpRequest(req: Request, message: string = 'Request received', data?: any) {
    const userAgent = req.get('User-Agent') || 'Unknown';
    const context = {
      category: LogCategory.HTTP,
      component: LogComponent.API,
      action: 'REQUEST',
      method: req.method,
      url: req.originalUrl,
      userId: req.userId as number,
      userRole: this.getUserRole(req.rol_id as number),
      ip: this.getClientIP(req),
      userAgent: this.parseUserAgent(userAgent),
      requestId: req.headers['x-request-id'] as string,
      correlationId: req.headers['x-correlation-id'] as string,
      sessionId: req.headers['x-session-id'] as string
    };

    // Enriquecer datos con información útil
    const enrichedData = {
      ...data,
      headers: {
        'content-type': req.get('Content-Type'),
        'content-length': req.get('Content-Length'),
        'authorization': req.get('Authorization') ? '[PRESENT]' : '[MISSING]'
      },
      query: Object.keys(req.query).length > 0 ? req.query : undefined,
      params: Object.keys(req.params).length > 0 ? req.params : undefined,
      body: this.sanitizeRequestBody(req.body, req.method)
    };

    this.info(message, enrichedData, context);
  }

  public httpResponse(req: Request, res: Response, responseTime: number, message: string = 'Request completed', data?: any) {
    const context = {
      category: LogCategory.HTTP,
      component: LogComponent.API,
      action: 'RESPONSE',
      method: req.method,
      url: req.originalUrl,
      statusCode: res.statusCode,
      responseTime,
      userId: req.userId as number,
      userRole: this.getUserRole(req.rol_id as number),
      ip: this.getClientIP(req),
      requestId: req.headers['x-request-id'] as string,
      correlationId: req.headers['x-correlation-id'] as string
    };

    // Enriquecer datos con métricas de response
    const enrichedData = {
      ...data,
      responseHeaders: {
        'content-type': res.get('Content-Type'),
        'content-length': res.get('Content-Length')
      },
      performance: {
        responseTime: `${responseTime}ms`,
        category: this.getPerformanceCategory(responseTime)
      }
    };

    if (res.statusCode >= 500) {
      this.error(message, undefined, enrichedData, context);
    } else if (res.statusCode >= 400) {
      this.warn(message, enrichedData, context);
    } else {
      this.info(message, enrichedData, context);
    }
  }

  // Logging específico para base de datos
  public database(operation: string, table: string, duration?: number, data?: any, error?: Error) {
    const context = {
      category: LogCategory.DATABASE,
      component: LogComponent.DATABASE,
      action: operation.toUpperCase()
    };

    const enrichedData = {
      table,
      duration: duration ? `${duration}ms` : undefined,
      performance: duration ? this.getPerformanceCategory(duration) : undefined,
      ...data
    };

    const message = `${operation.toUpperCase()} operation on ${table}${duration ? ` completed in ${duration}ms` : ''}`;

    if (error) {
      this.error(message, error, enrichedData, context);
    } else if (duration && duration > 1000) {
      this.warn(`Slow ${message}`, enrichedData, context);
    } else {
      this.debug(message, enrichedData, context);
    }
  }

  // Logging de autenticación mejorado
  public authentication(action: string, userId?: number, success: boolean = true, data?: any, error?: Error) {
    const context = {
      category: LogCategory.AUTH,
      component: LogComponent.AUTH,
      action: action.toUpperCase(),
      userId,
      userRole: this.getUserRole(data?.rol_id),
      metadata: {
        securityContext: {
          action,
          success,
          timestamp: Date.now(),
          userAgent: data?.userAgent,
          ip: data?.ip
        }
      }
    };

    const message = `Authentication ${action} ${success ? 'successful' : 'failed'}${userId ? ` for user ${userId}` : ''}`;

    if (!success || error) {
      this.warn(message, data, context);
    } else {
      this.info(message, data, context);
    }
  }

  // Logging de validación mejorado  
  public validation(field: string, error: string, data?: any, context?: Partial<LogEntry>) {
    this.warn(`Validation failed for ${field}: ${error}`, data, {
      category: LogCategory.VALIDATION,
      component: LogComponent.VALIDATOR,
      action: 'VALIDATE',
      ...context
    });
  }

  // Logging de lógica de negocio
  public business(action: string, message: string, data?: any, context?: Partial<LogEntry>) {
    this.info(`Business logic: ${action} - ${message}`, data, {
      category: LogCategory.BUSINESS,
      component: LogComponent.SERVICE,
      action: action.toUpperCase(),
      ...context
    });
  }

  // Logging de seguridad
  public security(event: string, severity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL', data?: any, context?: Partial<LogEntry>) {
    const message = `Security event: ${event} [${severity}]`;
    
    const securityContext = {
      category: LogCategory.SECURITY,
      component: LogComponent.API,
      action: 'SECURITY_EVENT',
      metadata: {
        securityContext: {
          event,
          severity,
          timestamp: Date.now(),
          ...data
        }
      },
      ...context
    };

    if (severity === 'CRITICAL' || severity === 'HIGH') {
      this.error(message, undefined, data, securityContext);
    } else if (severity === 'MEDIUM') {
      this.warn(message, data, securityContext);
    } else {
      this.info(message, data, securityContext);
    }
  }

  // Logging de auditoría
  public audit(action: string, resourceType: string, resourceId: string | number, userId?: number, data?: any) {
    this.info(`Audit: ${action} on ${resourceType}:${resourceId}`, data, {
      category: LogCategory.AUDIT,
      action: action.toUpperCase(),
      userId,
      metadata: {
        businessContext: {
          resourceType,
          resourceId,
          action,
          timestamp: Date.now()
        }
      }
    });
  }

  // Métodos auxiliares privados
  private getUserRole(roleId?: number): string {
    if (!roleId) return 'Unknown';
    switch (roleId) {
      case 1: return 'Admin';
      case 2: return 'University';
      case 3: return 'Student';
      default: return `Role${roleId}`;
    }
  }

  private getClientIP(req: Request): string {
    return req.ip || 
           req.connection.remoteAddress || 
           (req.headers['x-forwarded-for'] as string)?.split(',')[0] || 
           'Unknown';
  }

  private parseUserAgent(userAgent: string): string {
    // Extraer información básica del user agent
    if (userAgent.includes('Chrome')) return 'Chrome';
    if (userAgent.includes('Firefox')) return 'Firefox';
    if (userAgent.includes('Safari')) return 'Safari';
    if (userAgent.includes('Postman')) return 'Postman';
    if (userAgent.includes('curl')) return 'curl';
    return 'Unknown';
  }

  private getPerformanceCategory(duration: number): string {
    if (duration < 100) return 'EXCELLENT';
    if (duration < 200) return 'GOOD';
    if (duration < 500) return 'ACCEPTABLE';
    if (duration < 1000) return 'SLOW';
    return 'CRITICAL';
  }

  private sanitizeRequestBody(body: any, method: string): any {
    if (method === 'GET' || !body) return undefined;
    
    // Crear copia para no modificar el original
    const sanitized = { ...body };
    
    // Ocultar campos sensibles
    const sensitiveFields = ['password', 'token', 'secret', 'key', 'auth'];
    sensitiveFields.forEach(field => {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    });
    
    return sanitized;
  }
}

// Middleware mejorado para logging de requests HTTP
export function requestLoggingMiddleware(req: Request, res: Response, next: NextFunction) {
  const startTime = Date.now();
  const logger = Logger.getInstance();

  // Generar IDs únicos para seguimiento
  const requestId = `req_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  const correlationId = req.headers['x-correlation-id'] as string || `corr_${Date.now()}`;
  
  req.headers['x-request-id'] = requestId;
  req.headers['x-correlation-id'] = correlationId;

  // Log detallado de la request entrante
  logger.httpRequest(req, 'Request received', {
    headers: {
      'accept': req.get('Accept'),
      'content-type': req.get('Content-Type'),
      'user-agent': req.get('User-Agent'),
      'origin': req.get('Origin'),
      'referer': req.get('Referer')
    },
    query: Object.keys(req.query).length > 0 ? req.query : undefined,
    params: Object.keys(req.params).length > 0 ? req.params : undefined,
    bodySize: req.get('Content-Length') || '0'
  });

  // Interceptar el final de la response con más detalle
  const originalSend = res.send;
  const originalJson = res.json;
  
  let responseData: any = null;
  let responseSize = 0;

  // Interceptar res.send
  res.send = function(data) {
    responseData = data;
    responseSize = data ? Buffer.byteLength(data, 'utf8') : 0;
    
    const responseTime = Date.now() - startTime;
    logResponse(responseTime, responseSize, 'send');
    
    return originalSend.call(this, data);
  };

  // Interceptar res.json
  res.json = function(data) {
    responseData = data;
    const jsonString = JSON.stringify(data);
    responseSize = Buffer.byteLength(jsonString, 'utf8');
    
    const responseTime = Date.now() - startTime;
    logResponse(responseTime, responseSize, 'json');
    
    return originalJson.call(this, data);
  };

  function logResponse(responseTime: number, size: number, method: string) {
    // Log detallado de la response
    logger.httpResponse(req, res, responseTime, 'Request completed', {
      responseSize: `${(size / 1024).toFixed(2)}KB`,
      responseMethod: method,
      performance: {
        responseTime: `${responseTime}ms`,
        category: responseTime < 100 ? 'FAST' : responseTime < 500 ? 'NORMAL' : 'SLOW',
        memoryUsage: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB`
      },
      // Solo incluir response data en modo TRACE y si no es muy grande
      responsePreview: process.env.LOG_LEVEL === 'TRACE' && size < 1024 ? responseData : undefined
    });

    // Log adicional para requests lentas
    if (responseTime > 1000) {
      logger.warn('Slow request detected', {
        url: req.originalUrl,
        method: req.method,
        responseTime: `${responseTime}ms`,
        userId: req.userId,
        statusCode: res.statusCode
      }, {
        category: LogCategory.PERFORMANCE,
        component: LogComponent.API,
        action: 'SLOW_REQUEST'
      });
    }

    // Log para responses de error
    if (res.statusCode >= 400) {
      logger.security('HTTP_ERROR_RESPONSE', res.statusCode >= 500 ? 'HIGH' : 'MEDIUM', {
        statusCode: res.statusCode,
        url: req.originalUrl,
        method: req.method,
        userId: req.userId,
        ip: logger['getClientIP'](req),
        userAgent: req.get('User-Agent')
      });
    }
  }

  next();
}

// Middleware mejorado para capturar errores no manejados
export function errorLoggingMiddleware(error: Error, req: Request, res: Response, next: NextFunction) {
  const logger = Logger.getInstance();
  
  // Determinar severidad del error
  const isClientError = res.statusCode >= 400 && res.statusCode < 500;
  const isServerError = res.statusCode >= 500;
  
  const errorContext = {
    category: LogCategory.ERROR,
    component: LogComponent.API,
    action: 'ERROR_HANDLER',
    method: req.method,
    url: req.originalUrl,
    statusCode: res.statusCode || 500,
    userId: req.userId as number,
    userRole: logger['getUserRole'](req.rol_id as number),
    ip: logger['getClientIP'](req),
    userAgent: req.get('User-Agent'),
    requestId: req.headers['x-request-id'] as string,
    correlationId: req.headers['x-correlation-id'] as string,
    metadata: {
      businessContext: {
        errorType: error.constructor.name,
        errorCode: (error as any).code,
        sqlState: (error as any).sqlState,
        severity: isServerError ? 'HIGH' : 'MEDIUM'
      }
    }
  };

  const errorData = {
    errorName: error.name,
    errorMessage: error.message,
    errorCode: (error as any).code,
    requestBody: logger['sanitizeRequestBody'](req.body, req.method),
    requestQuery: req.query,
    requestParams: req.params,
    headers: {
      'content-type': req.get('Content-Type'),
      'authorization': req.get('Authorization') ? '[PRESENT]' : '[MISSING]',
      'user-agent': req.get('User-Agent')
    },
    stackTrace: error.stack?.split('\n').slice(0, 15) // Primeras 15 líneas del stack
  };

  if (isServerError) {
    logger.error('Unhandled server error', error, errorData, errorContext);
    
    // Log de seguridad para errores del servidor
    logger.security('SERVER_ERROR', 'HIGH', {
      error: error.message,
      url: req.originalUrl,
      userId: req.userId,
      ip: logger['getClientIP'](req)
    });
  } else if (isClientError) {
    logger.warn('Client error in request', errorData, errorContext);
  } else {
    logger.error('Unknown error in request', error, errorData, errorContext);
  }

  // Si la respuesta no ha sido enviada, enviar error apropiado
  if (!res.headersSent) {
    const statusCode = res.statusCode || 500;
    const responseBody = {
      error: isServerError ? 'Internal Server Error' : error.message,
      requestId: req.headers['x-request-id'],
      timestamp: new Date().toISOString(),
      ...(process.env.NODE_ENV === 'development' && {
        stack: error.stack?.split('\n').slice(0, 5)
      })
    };

    res.status(statusCode).json(responseBody);
  }

  next(error);
}

// Exportar instancia singleton del logger
export const logger = Logger.getInstance();
export default logger;
