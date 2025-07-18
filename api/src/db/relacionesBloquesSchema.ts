// db/relacionesBloquesSchema.ts
import { pgTable, integer} from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { bloquesTable } from './bloquesSchema';

export const relacionesBloquesTable = pgTable('relaciones_bloques', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bloque_padre_id: integer().references(() => bloquesTable.id),
  bloque_hijo_id: integer().references(() => bloquesTable.id),
});

export const insertRelacionesBloquesSchema = z.object({
  id: z.number().int(),
  bloque_padre_id: z.number().int(),
  bloque_hijo_id: z.number().int(),
}).omit({
  id: true,
});

export const updateRelacionesBloquesSchema = z.object({
  id: z.number().int(),
  bloque_padre_id: z.number().int().optional(),
  bloque_hijo_id: z.number().int().optional(),
}).omit({
  id: true,
}).partial();
