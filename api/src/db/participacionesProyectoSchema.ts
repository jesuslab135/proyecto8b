// db/participacionesProyectosSchema.ts
import { pgTable, integer, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usersTable } from './usersSchema';
import { proyectosTable } from './proyectosSchema';
import { rolesProyectoTable } from './rolesProyectoSchema';


export const participacionesProyectosTable = pgTable('participaciones_proyecto', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  proyecto_id: integer().references(() => proyectosTable.id),
  usuario_id: integer().references(() => usersTable.id),
  rol_id: integer().references(() => rolesProyectoTable.id),
  estado: varchar({ length: 20 }).default('activo'),
  invitado_por: integer().references(() => usersTable.id),
  fecha_invitacion: timestamp().defaultNow(),
});

export const insertParticipacionesProyectosSchema = z.object({
  id: z.number().int(),
  proyecto_id: z.number().int(),
    usuario_id: z.number().int(),
    rol_id: z.number().int(),
    estado: z.string().max(20).default('activo'),
    invitado_por: z.number().int(),
    fecha_invitacion: z.date().optional(),
}).omit({
  id: true,
});

export const updateParticipacionesProyectosSchema = z.object({
  id: z.number().int(),
  proyecto_id: z.number().int().optional(),
  usuario_id: z.number().int().optional(),
  rol_id: z.number().int().optional(),
  estado: z.string().max(20).optional(),
  invitado_por: z.number().int().optional(),
  fecha_invitacion: z.date().optional(),
}).omit({
  id: true,
}).partial();
