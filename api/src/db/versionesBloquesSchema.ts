// db/versionesBloquesSchema.ts
import { pgTable, integer, jsonb, date} from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { bloquesTable } from './bloquesSchema';
import { usersTable } from './usersSchema';


export const versionesBloquesTable = pgTable('versiones_bloques', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bloque_id: integer().references(() => bloquesTable.id),
  contenido: jsonb(),
  editado_por: integer().references(() => usersTable.id),
  editado_en: date().defaultNow(),
});

export const insertVersionesBloquesSchema = z.object({
  id: z.number().int(),
  bloque_id: z.number().int(),
  contenido: z.object({}).passthrough(),
  editado_por: z.number().int(),
  editado_en: z.date().optional(),
}).omit({
  id: true,
});

export const updateVersionesBloquesSchema = z.object({
  id: z.number().int(),
  bloque_id: z.number().int().optional(),
  contenido: z.object({}).passthrough().optional(),
  editado_por: z.number().int().optional(),
  editado_en: z.date().optional(),
}).omit({
  id: true,
}).partial();