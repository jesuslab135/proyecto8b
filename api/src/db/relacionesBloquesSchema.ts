// src/db/relacionesBloquesSchema.ts
import { pgTable, integer } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { bloquesTable } from './bloquesSchema';

export const relacionesBloquesTable = pgTable('relaciones_bloques', {
  id: integer('id').primaryKey().notNull(),
  bloque_padre_id: integer('bloque_padre_id')
    .notNull()
    .references(() => bloquesTable.id),
  bloque_hijo_id: integer('bloque_hijo_id')
    .notNull()
    .references(() => bloquesTable.id),
});

export const insertRelacionBloqueSchema = z.object({
  id: z.number(),
  bloque_padre_id: z.number().int(),
  bloque_hijo_id: z.number().int(),
}).omit({id: true});

export const updateRelacionBloqueSchema = z.object({
  id: z.number(),
  bloque_padre_id: z.number().int().optional(),
  bloque_hijo_id: z.number().int().optional(),
}).omit({id: true}).partial();
