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
export const insertParticipacionesProyectoSchema = z.object({
  proyecto_id: z.number().int(),
  usuario_id: z.number().int(),
  rol_id: z.number().int(),
  estado: z.string().max(50),
  invitado_por: z.number().int(),
  fecha_invitacion: z.date().optional(),
});

export const updateParticipacionesProyectoSchema = z.object({
  proyecto_id: z.number().int(),
  usuario_id: z.number().int(),
  rol_id: z.number().int(),
  estado: z.string().max(50),
  invitado_por: z.number().int(),
  fecha_invitacion: z.date().optional(),
}).partial();
