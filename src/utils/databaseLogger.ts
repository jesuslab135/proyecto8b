import { logger, LogCategory, LogComponent } from './logger';

// Wrapper mejorado para operaciones de base de datos con logging detallado
export class DatabaseLogger {
  private static formatQuery(query: string): string {
    return query.replace(/\s+/g, ' ').trim();
  }

  private static getQueryType(query: string): string {
    const firstWord = query.trim().split(/\s+/)[0].toUpperCase();
    return ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'CREATE', 'ALTER', 'DROP'].includes(firstWord) 
      ? firstWord 
      : 'QUERY';
  }

  private static analyzeQueryComplexity(query: string): 'SIMPLE' | 'MODERATE' | 'COMPLEX' {
    const lowerQuery = query.toLowerCase();
    let complexity = 0;
    
    // Contar joins
    complexity += (lowerQuery.match(/\sjoin\s/g) || []).length * 2;
    
    // Contar subqueries
    complexity += (lowerQuery.match(/\(\s*select\s/g) || []).length * 3;
    
    // Contar funciones agregadas
    complexity += (lowerQuery.match(/count\(|sum\(|avg\(|max\(|min\(/g) || []).length;
    
    // Contar condiciones WHERE complejas
    complexity += (lowerQuery.match(/\sand\s|\sor\s/g) || []).length;
    
    if (complexity === 0) return 'SIMPLE';
    if (complexity <= 3) return 'MODERATE';
    return 'COMPLEX';
  }

  static async logQuery<T>(
    operation: () => Promise<T>,
    queryInfo: {
      operation: 'SELECT' | 'INSERT' | 'UPDATE' | 'DELETE' | 'QUERY';
      table?: string;
      description?: string;
      params?: any;
      query?: string;
      userId?: number;
      context?: string;
    }
  ): Promise<T> {
    const startTime = Date.now();
    const { operation: op, table, description, params, query, userId, context } = queryInfo;

    // Análisis de la query si está disponible
    const queryAnalysis = query ? {
      type: this.getQueryType(query),
      complexity: this.analyzeQueryComplexity(query),
      formattedQuery: this.formatQuery(query),
      estimatedRows: this.estimateAffectedRows(query, params)
    } : null;

    try {
      // Log de inicio de operación
      logger.database(
        'STARTING',
        table || 'unknown',
        undefined,
        {
          operation: op,
          description,
          params: this.sanitizeParams(params),
          queryAnalysis,
          context,
          userId
        }
      );

      const result = await operation();
      const duration = Date.now() - startTime;

      // Análisis del resultado
      const resultAnalysis = this.analyzeResult(result, op);

      // Log de éxito con métricas detalladas
      logger.database(
        'COMPLETED',
        table || 'unknown',
        duration,
        {
          operation: op,
          success: true,
          resultAnalysis,
          performance: {
            duration: `${duration}ms`,
            category: duration < 50 ? 'FAST' : duration < 200 ? 'NORMAL' : duration < 500 ? 'SLOW' : 'CRITICAL',
            queryComplexity: queryAnalysis?.complexity || 'UNKNOWN'
          },
          context,
          userId
        }
      );

      // Alertas para queries problemáticas
      if (duration > 1000) {
        logger.warn(`Very slow database operation detected`, {
          operation: op,
          table,
          duration: `${duration}ms`,
          queryComplexity: queryAnalysis?.complexity,
          resultSize: resultAnalysis.count
        }, {
          category: LogCategory.PERFORMANCE,
          component: LogComponent.DATABASE,
          action: 'SLOW_QUERY_ALERT'
        });
      }

      if (queryAnalysis?.complexity === 'COMPLEX' && duration > 500) {
        logger.warn(`Complex query with significant duration`, {
          operation: op,
          table,
          duration: `${duration}ms`,
          complexity: queryAnalysis.complexity,
          query: queryAnalysis.formattedQuery
        }, {
          category: LogCategory.PERFORMANCE,
          component: LogComponent.DATABASE,
          action: 'COMPLEX_QUERY_ALERT'
        });
      }

      return result;
    } catch (error) {
      const duration = Date.now() - startTime;
      
      // Análisis del error
      const errorAnalysis = this.analyzeError(error as Error);
      
      // Log detallado del error
      logger.database(
        'FAILED',
        table || 'unknown',
        duration,
        {
          operation: op,
          success: false,
          params: this.sanitizeParams(params),
          queryAnalysis,
          errorAnalysis,
          context,
          userId
        },
        error as Error
      );

      // Log de seguridad si es necesario
      if (errorAnalysis.securityRelevant) {
        logger.security('DATABASE_ERROR', 'MEDIUM', {
          operation: op,
          table,
          error: (error as Error).message,
          userId,
          context
        });
      }

      throw error;
    }
  }

  // Métodos específicos mejorados para cada tipo de operación
  static async logSelect<T>(
    operation: () => Promise<T>,
    table: string,
    description?: string,
    params?: any,
    query?: string,
    userId?: number
  ): Promise<T> {
    return this.logQuery(operation, {
      operation: 'SELECT',
      table,
      description: description || 'Fetching records',
      params,
      query,
      userId,
      context: 'DATA_READ'
    });
  }

  static async logInsert<T>(
    operation: () => Promise<T>,
    table: string,
    data?: any,
    userId?: number
  ): Promise<T> {
    return this.logQuery(operation, {
      operation: 'INSERT',
      table,
      description: 'Creating new record',
      params: data,
      userId,
      context: 'DATA_CREATE'
    });
  }

  static async logUpdate<T>(
    operation: () => Promise<T>,
    table: string,
    data?: any,
    condition?: string,
    userId?: number
  ): Promise<T> {
    return this.logQuery(operation, {
      operation: 'UPDATE',
      table,
      description: condition ? `Updating records where ${condition}` : 'Updating records',
      params: data,
      userId,
      context: 'DATA_UPDATE'
    });
  }

  static async logDelete<T>(
    operation: () => Promise<T>,
    table: string,
    condition?: string,
    userId?: number
  ): Promise<T> {
    return this.logQuery(operation, {
      operation: 'DELETE',
      table,
      description: condition ? `Deleting records where ${condition}` : 'Deleting records',
      userId,
      context: 'DATA_DELETE'
    });
  }

  // Métodos de análisis privados
  private static sanitizeParams(params: any): any {
    if (!params) return undefined;
    
    const sanitized = { ...params };
    const sensitiveFields = ['password', 'token', 'secret', 'key', 'auth', 'hash'];
    
    sensitiveFields.forEach(field => {
      if (sanitized[field]) {
        sanitized[field] = '[REDACTED]';
      }
    });
    
    return sanitized;
  }

  private static analyzeResult(result: any, operation: string): any {
    if (!result) return { count: 0, type: 'empty' };
    
    if (Array.isArray(result)) {
      return {
        type: 'array',
        count: result.length,
        isEmpty: result.length === 0,
        sample: result.length > 0 ? Object.keys(result[0] || {}) : []
      };
    }
    
    if (typeof result === 'object') {
      if (result.rowCount !== undefined) {
        return {
          type: 'mutation_result',
          count: result.rowCount,
          affectedRows: result.rowCount
        };
      }
      
      return {
        type: 'object',
        count: 1,
        properties: Object.keys(result)
      };
    }
    
    return {
      type: typeof result,
      count: 1,
      value: result
    };
  }

  private static analyzeError(error: Error): any {
    const analysis = {
      type: error.constructor.name,
      message: error.message,
      securityRelevant: false,
      category: 'UNKNOWN'
    };

    // Análisis específico para errores de PostgreSQL
    if ('code' in error) {
      const pgError = error as any;
      analysis.category = this.categorizePostgresError(pgError.code);
      analysis.securityRelevant = this.isSecurityRelevantError(pgError.code);
    }

    return analysis;
  }

  private static categorizePostgresError(code: string): string {
    const errorCategories: Record<string, string> = {
      '23505': 'UNIQUE_VIOLATION',
      '23503': 'FOREIGN_KEY_VIOLATION',
      '23502': 'NOT_NULL_VIOLATION',
      '23514': 'CHECK_VIOLATION',
      '42P01': 'UNDEFINED_TABLE',
      '42703': 'UNDEFINED_COLUMN',
      '28P01': 'INVALID_PASSWORD',
      '08006': 'CONNECTION_FAILURE',
      '53300': 'TOO_MANY_CONNECTIONS'
    };

    return errorCategories[code] || 'UNKNOWN_ERROR';
  }

  private static isSecurityRelevantError(code: string): boolean {
    const securityCodes = ['28P01', '28000', '42501', '42P01'];
    return securityCodes.includes(code);
  }

  private static estimateAffectedRows(query: string, params: any): string {
    const lowerQuery = query.toLowerCase();
    
    if (lowerQuery.includes('limit')) {
      const limitMatch = query.match(/limit\s+(\d+)/i);
      return limitMatch ? `~${limitMatch[1]}` : 'limited';
    }
    
    if (lowerQuery.includes('where')) {
      return 'filtered';
    }
    
    if (lowerQuery.startsWith('select')) {
      return 'potentially_many';
    }
    
    return 'unknown';
  }
}

export default DatabaseLogger;
