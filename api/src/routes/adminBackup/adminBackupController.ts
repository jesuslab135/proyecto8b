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
/* function runPgCommand(command: string, res: Response, successMsg: string) {
  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr });
    }
    res.json({ message: successMsg, output: stdout });
  });
} */

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
 *     summary: Realiza un respaldo parcial por tablas seleccionadas
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
 *             properties:
 *               tables:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: Selecciona una o más tablas de la base de datos para el respaldo parcial.
 *                 enum:
 *                   - actividad_usuario
 *                   - asistencias_evento
 *                   - bloques
 *                   - conversaciones
 *                   - eventos
 *                   - experiencia_usuario
 *                   - foros
 *                   - hilos
 *                   - mensajes
 *                   - oportunidades
 *                   - paginas_colaborativas
 *                   - participaciones_proyecto
 *                   - perfiles
 *                   - postulaciones
 *                   - proyectos
 *                   - proyectos_validaciones
 *                   - reportes
 *                   - respuestas_hilo
 *                   - roles_proyecto
 *                   - roles_usuario
 *                   - seguimientos
 *                   - taggables
 *                   - tags
 *                   - universidades
 *                   - usuarios
 *                   - versiones_bloques
 *     responses:
 *       200:
 *         description: Respaldo parcial realizado
 *       400:
 *         description: Error en la solicitud
 */
export const backupPartial = async (req: Request, res: Response) => {
  if (!(await validateUserRole(req, res, [1, 2]))) return;
  const { tables } = req.body;

  const allowedTables = [
    'actividad_usuario', 'asistencias_evento', 'bloques', 'conversaciones',
    'eventos', 'experiencia_usuario', 'foros', 'hilos', 'mensajes',
    'oportunidades', 'paginas_colaborativas', 'participaciones_proyecto',
    'perfiles', 'postulaciones', 'proyectos', 'proyectos_validaciones',
    'reportes', 'respuestas_hilo', 'roles_proyecto', 'roles_usuario',
    'seguimientos', 'taggables', 'tags', 'universidades', 'usuarios', 'versiones_bloques'
  ];

  if (!tables || !Array.isArray(tables) || tables.some((t: string) => !allowedTables.includes(t))) {
    return res.status(400).json({ error: 'Debes especificar tablas válidas' });
  }

  const tableArgs = tables.join(' ');
  const batPath = '"C:\\Users\\MSI\\Desktop\\backup_partial.bat"';
  const command = `cmd /c ${batPath} ${tableArgs}`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      return res.status(500).json({ error: stderr });
    }
    res.status(200).json({ message: 'Respaldo parcial realizado', output: stdout });
  });
};

/**
 * @swagger
 * /admin-backup/restore-full:
 *   post:
 *     summary: Restaura una base de datos completa desde el archivo .bat más reciente
 *     tags: [adminBackup]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Restauración completa realizada
 *       500:
 *         description: Error al ejecutar el script
 */
export const restoreFull = async (req: Request, res: Response) => {
  if (!(await validateUserRole(req, res, [1]))) return;
  const batPath = '"C:\\Users\\MSI\\Desktop\\restore_full.bat"';
  await db.$client.end();
  exec(batPath, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error ejecutando restore_full.bat:', stderr);
      return res.status(500).json({ error: stderr });
    }
    res.status(200).json({ message: '✅ Restauración completa realizada', output: stdout });
  });
};

/**
 * @swagger
 * /admin-backup/restore-partial:
 *   post:
 *     summary: Restaura un respaldo parcial de la base de datos desde archivo .bat
 *     description: Ejecuta un script .bat para restaurar las tablas especificadas previamente mediante un respaldo parcial. El archivo usado tiene como nombre `union_partial_YYYYMMDD.sql`, ubicado en el escritorio.
 *     tags: [adminBackup]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Restauración parcial realizada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: ✅ Restauración parcial realizada correctamente
 *                 output:
 *                   type: string
 *                   description: Salida del comando ejecutado
 *       401:
 *         description: Token inválido o ausente
 *       403:
 *         description: No tienes permisos para esta acción
 *       500:
 *         description: Error al ejecutar el script .bat
 */

export const restorePartial = async (req: Request, res: Response) => {
  if (!(await validateUserRole(req, res, [1, 2]))) return;

  const batPath = '"C:\\Users\\MSI\\Desktop\\restore_partial.bat"';
  await db.$client.end();

  exec(batPath, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Error ejecutando restore_partial.bat:', stderr);
      return res.status(500).json({ error: stderr });
    }

    res.status(200).json({
      message: '✅ Restauración parcial realizada correctamente',
      output: stdout,
    });
  });
};

/**
 * @swagger
 * /admin-backup/export-csv/{table}:
 *   get:
 *     summary: Exporta una tabla específica de un esquema a un archivo CSV mediante script .bat
 *     description: "Ejecuta un script `.bat` para exportar una tabla PostgreSQL a CSV con encabezado. El archivo se genera como tabla.csv en el mismo directorio del script."
 *     tags: [adminBackup]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: table
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - actividad_usuario
 *             - asistencias_evento
 *             - bloques
 *             - conversaciones
 *             - eventos
 *             - experiencia_usuario
 *             - foros
 *             - hilos
 *             - mensajes
 *             - oportunidades
 *             - paginas_colaborativas
 *             - participaciones_proyecto
 *             - perfiles
 *             - postulaciones
 *             - proyectos
 *             - proyectos_validaciones
 *             - reportes
 *             - respuestas_hilo
 *             - roles_proyecto
 *             - roles_usuario
 *             - seguimientos
 *             - taggables
 *             - tags
 *             - universidades
 *             - usuarios
 *             - versiones_bloques
 *         description: "Nombre de la tabla (selecciona desde la lista)"
 *       - in: query
 *         name: schema
 *         required: true
 *         schema:
 *           type: string
 *           enum:
 *             - public
 *         description: "Nombre del esquema"
 *     responses:
 *       200:
 *         description: Exportación realizada exitosamente
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Esquema o tabla no especificados
 *       403:
 *         description: No tienes permisos para esta acción
 *       500:
 *         description: Error durante la exportación
 */


export const exportCsv = async (req: Request, res: Response) => {
  if (!(await validateUserRole(req, res, [1, 2, 3]))) return;

  const { table } = req.params;
  const { schema } = req.query;

  if (!table || !schema) {
    return res.status(400).json({ error: 'Debes especificar la tabla y el esquema' });
  }

  const batPath = '"C:\\Users\\MSI\\Desktop\\export_table_to_csv.bat"';
  const command = `cmd /c ${batPath} ${schema} ${table}`;
  const outputFile = `${table}.csv`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Error al exportar ${schema}.${table}:`, stderr);
      return res.status(500).json({ error: `Error al exportar la tabla: ${stderr}` });
    }

    // Verificar que el archivo exista antes de enviarlo
    const filePath = `${process.cwd()}\\${outputFile}`;
    res.download(filePath, outputFile, (err) => {
      if (err) {
        console.error('❌ Error al enviar el archivo CSV:', err);
        return res.status(500).json({ error: 'Archivo generado pero no se pudo descargar' });
      }
    });
  });
};

