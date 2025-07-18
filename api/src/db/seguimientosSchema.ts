// db/seguimientosSchema.ts
import { pgTable, integer, timestamp} from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usersTable } from './usersSchema';
import { proyectosTable } from './proyectosSchema';

export const seguimientosTable = pgTable('seguimientos', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  seguidor_id: integer().references(() => usersTable.id),
  seguido_usuario_id: integer().references(() => usersTable.id),
  seguido_proyecto_id: integer().references(() => proyectosTable.id),
  creado_en: timestamp().defaultNow(),
});

export const insertSeguimientosSchema = z.object({
  id: z.number().int(),
  seguidor_id: z.number().int(),
  seguido_usuario_id: z.number().int(),
  seguido_proyecto_id: z.number().int(),
  creado_en: z.date().optional(),
}).omit({
  id: true,
});

export const updateSeguimientosSchema = z.object({
  id: z.number().int(),
  seguidor_id: z.number().int().optional(),
  seguido_usuario_id: z.number().int().optional(),
  seguido_proyecto_id: z.number().int().optional(),
  creado_en: z.date().optional(),
}).omit({
  id: true,
}).partial();
