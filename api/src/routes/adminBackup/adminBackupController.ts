/**
 * @module adminBackupController
 * Controlador para realizar operaciones de respaldo y restauración de la base de datos PostgreSQL
 * mediante comandos del sistema. Protegido por validación de token y roles.
 */

import { Request, Response } from 'express';
import { exec } from 'child_process';
import { db } from '../../db';
import { eq } from 'drizzle-orm';
import { usuariosTable } from '../../db/usuariosSchema';

/**
 * Obtiene un usuario por su ID desde la base de datos.
 * @param id - ID del usuario
 * @returns El usuario correspondiente o undefined
 */
async function getUsuarioById(id: number) {
  const [usuario] = await db.select().from(usuariosTable).where(eq(usuariosTable.id, id));
  return usuario;
}

/**
 * Ejecuta un comando del sistema operativo.
 * @param command - Comando a ejecutar
 * @param res - Objeto de respuesta HTTP
 * @param successMsg - Mensaje a devolver en caso de éxito
 */
function runPgCommand(command: string, res: Response, successMsg: string) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr });
    }
    res.json({ message: successMsg, output: stdout });
  });
}

/**
 * Valida si el usuario autenticado tiene uno de los roles permitidos.
 * @param req - Objeto de solicitud HTTP
 * @param res - Objeto de respuesta HTTP
 * @param allowedRoles - Lista de roles permitidos
 * @returns true si está autorizado, false si no
 */
async function validateUserRole(req: Request, res: Response, allowedRoles: number[]): Promise<boolean> {
  const userId = req.userId;
  if (!userId) {
    res.status(401).json({ error: 'Token inválido o ausente' });
    return false;
  }

  const usuario = await getUsuarioById(Number(userId));
  if (!usuario || !allowedRoles.includes(Number(usuario.rol_id))) {
    res.status(403).json({ error: 'No tienes permisos para esta acción' });
    return false;
  }

  return true;
}

/**
 * @swagger
 * /admin-backup/execute-bat:
 *   post:
 *     summary: Ejecuta el script de respaldo desde archivo .bat
 *     tags: [adminBackup]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Script .bat ejecutado correctamente
 *       500:
 *         description: Error al ejecutar el script
 */
export const runBackupBat = async (req: Request, res: Response) => {
  if (!(await validateUserRole(req, res, [1]))) return;
  const batPath = '"C:\\Users\\MSI\\Desktop\\backup_union.bat"';

  exec(batPath, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error ejecutando .bat:', stderr);
      return res.status(500).json({ error: stderr });
    }

    res.status(200).json({
      message: '✅ Script de respaldo ejecutado correctamente',
      output: stdout,
    });
  });
};


/**
 * @swagger
 * /admin-backup/partial:
 *   post:
 *     summary: Realiza un respaldo parcial por tablas y esquema
 *     tags: [adminBackup]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tables
 *               - schema
 *             properties:
 *               tables:
 *                 type: array
 *                 items:
 *                   type: string
 *               schema:
 *                 type: string
 *     responses:
 *       200:
 *         description: Respaldo parcial realizado
 *       400:
 *         description: Error en la solicitud
 */
export const backupPartial = async (req: Request, res: Response) => {
  if (!(await validateUserRole(req, res, [1, 2]))) return;
  const { tables, schema } = req.body;
  if (!tables || !Array.isArray(tables)) {
    return res.status(400).json({ error: 'Debes especificar las tablas' });
  }
  const qualifiedTables = tables.map((t: string) => `${schema}.${t}`).join(' ');
  runPgCommand(`"C:\\Program Files\\PostgreSQL\\17\\bin\\pg_dump.exe" -t ${qualifiedTables} nombre_bd > backup_partial.sql`, res, 'Respaldo parcial realizado');
};

/**
 * @swagger
 * /admin-backup/restore/full:
 *   post:
 *     summary: Restaura una base de datos completa desde un respaldo
 *     tags: [adminBackup]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Restauración completa realizada
 */
export const restoreFull = async (req: Request, res: Response) => {
  if (!(await validateUserRole(req, res, [1]))) return;
  runPgCommand('"C:\\Program Files\\PostgreSQL\\17\\bin\\psql.exe" nombre_bd < backup_full.sql', res, 'Restauración completa realizada');
};

/**
 * @swagger
 * /admin-backup/restore/partial:
 *   post:
 *     summary: Restaura un respaldo parcial de la base de datos
 *     tags: [adminBackup]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Restauración parcial realizada
 */
export const restorePartial = async (req: Request, res: Response) => {
  if (!(await validateUserRole(req, res, [1, 2]))) return;
  runPgCommand('"C:\\Program Files\\PostgreSQL\\17\\bin\\psql.exe" nombre_bd < backup_partial.sql', res, 'Restauración parcial realizada');
};

/**
 * @swagger
 * /admin-backup/export/{table}:
 *   get:
 *     summary: Exporta una tabla a CSV
 *     tags: [adminBackup]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: table
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre de la tabla
 *       - in: query
 *         name: schema
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del esquema
 *     responses:
 *       200:
 *         description: Exportación realizada
 *       400:
 *         description: Tabla o esquema no especificado
 */
export const exportCsv = async (req: Request, res: Response) => {
  if (!(await validateUserRole(req, res, [1, 2, 3]))) return;
  const { table } = req.params;
  const { schema } = req.query;
  if (!table || !schema) {
    return res.status(400).json({ error: 'Debes especificar la tabla y el esquema' });
  }
  const fullTableName = `${schema}.${table}`;
  exec(`"C:\\Program Files\\PostgreSQL\\17\\bin\\psql.exe" -d nombre_bd -c "COPY ${fullTableName} TO STDOUT WITH CSV HEADER" > ${table}.csv`, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr });
    }
    res.download(`${table}.csv`);
  });
};
