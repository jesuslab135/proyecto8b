// src/db/relacionesBloquesSchema.ts
import { pgTable, integer } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { bloquesTable } from './bloquesSchema';

export const relacionesBloquesTable = pgTable('relaciones_bloques', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bloque_padre_id: integer()
    .notNull()
    .references(() => bloquesTable.id),
  bloque_hijo_id: integer()
    .notNull()
    .references(() => bloquesTable.id),
});

export const insertRelacionBloqueSchema = z.object({
  bloque_padre_id: z.number().int(),
  bloque_hijo_id: z.number().int(),
});

export const updateRelacionBloqueSchema = z.object({
  bloque_padre_id: z.number().int().optional(),
  bloque_hijo_id: z.number().int().optional(),
}).partial();
