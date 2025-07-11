// db/actividadUsuarioSchema.ts
import { pgTable, integer, varchar, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usersTable } from './usersSchema';

export const actividadUsuarioTable = pgTable('actividad_usuario', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  usuario_id: integer().references(() => usersTable.id),
  tipo_actividad: varchar({ length: 100 }),
  objeto_id: integer(),
  contexto: varchar({ length: 50 }),
  fecha: timestamp().defaultNow(),
});

export const insertActividadUsuarioSchema = z.object({
  id: z.number().int(),
  usuario_id: z.number().int(),
  tipo_actividad: z.string().max(100),
  objeto_id: z.number().int(),
  contexto: z.string().max(50),
  fecha: z.date().optional(),
}).omit({
  id: true,
});

export const updateActividadUsuarioSchema = z.object({
  id: z.number().int(),
  usuario_id: z.number().int().optional(),
  tipo_actividad: z.string().max(100).optional(),
  objeto_id: z.number().int().optional(),
  contexto: z.string().max(50).optional(),
  fecha: z.date().optional(),
}).omit({
  id: true,
}).partial();
