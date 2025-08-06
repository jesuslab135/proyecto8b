// db/participacionesProyectoSchema.ts
import { pgTable, integer, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usuariosTable } from './usuariosSchema';
import { proyectosTable } from './proyectosSchema';
import { rolesProyectoTable } from './rolesProyectoSchema';

export const participacionesProyectoTable = pgTable('participaciones_proyecto', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  proyecto_id: integer().references(() => proyectosTable.id),
  usuario_id: integer().references(() => usuariosTable.id),
  rol_id: integer().references(() => rolesProyectoTable.id),
  estado: varchar({ length: 50 }),
  invitado_por: integer().references(() => usuariosTable.id),
  fecha_invitacion: timestamp().defaultNow(),
});

// Zod Schemas
// Permite usuario_id o email, uno de los dos requerido
export const insertParticipacionesProyectoSchema = z.object({
  proyecto_id: z.number().int(),
  usuario_id: z.number().int().optional(),
  email: z.string().email().optional(), // <-- PERMITIR email
  rol_id: z.number().int(),
  estado: z.string().max(50).optional(), // <-- hacerlo opcional
  invitado_por: z.number().int(),
  fecha_invitacion: z.date().optional(),
}).refine(data => data.usuario_id !== undefined || data.email !== undefined, {
  message: 'Se requiere usuario_id o email',
  path: ['usuario_id', 'email'],
});


export const updateParticipacionesProyectoSchema = z.object({
  proyecto_id: z.number().int(),
  usuario_id: z.number().int(),
  rol_id: z.number().int(),
  estado: z.string().max(50),
  invitado_por: z.number().int(),
  fecha_invitacion: z.date().optional(),
}).partial();
