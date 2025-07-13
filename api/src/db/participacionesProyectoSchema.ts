import { pgTable, integer, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usersTable } from './usersSchema';
import { proyectosTable } from './proyectosSchema';
import { rolesProyectoTable } from './rolesProyectoSchema';

export const participacionesProyectoTable = pgTable('participaciones_proyecto', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  proyecto_id: integer().references(() => proyectosTable.id),
  usuario_id: integer().references(() => usersTable.id),
  rol_id: integer().references(() => rolesProyectoTable.id),
  estado: varchar({ length: 50 }),
  invitado_por: integer().references(() => usersTable.id),
  fecha_invitacion: timestamp().defaultNow(),
});

// Zod Schemas
export const insertParticipacionesProyectoSchema = z.object({
  id: z.number().int(),
  proyecto_id: z.number().int(),
  usuario_id: z.number().int(),
  rol_id: z.number().int(),
  estado: z.string().max(50),
  invitado_por: z.number().int(),
  fecha_invitacion: z.date().optional(),
}).omit({ id: true });

export const updateParticipacionesProyectoSchema = z.object({
  id: z.number().int(),
  proyecto_id: z.number().int(),
  usuario_id: z.number().int(),
  rol_id: z.number().int(),
  estado: z.string().max(50),
  invitado_por: z.number().int(),
  fecha_invitacion: z.date().optional(),
}).omit({ id: true }).partial();
