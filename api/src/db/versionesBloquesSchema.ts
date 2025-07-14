// src/db/versionesBloquesSchema.ts
import { pgTable, integer, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { bloquesTable } from './bloquesSchema';
import { usersTable } from './usersSchema';

export const versionesBloquesTable = pgTable('versiones_bloques', {
  id: integer('id').primaryKey().notNull(),
  bloque_id: integer('bloque_id').references(() => bloquesTable.id).notNull(),
  contenido: jsonb('contenido'),
  editado_por: integer('editado_por').references(() => usersTable.id),
  editado_en: timestamp('editado_en').defaultNow(),
});

export const insertVersionBloqueSchema = z.object({
  id: z.number(),
  bloque_id: z.number().int(),
  contenido: z.any(),
  editado_por: z.number().int(),
  editado_en: z.date().optional(),
}).omit({id: true});

export const updateVersionBloqueSchema = z.object({
  id: z.number(),
  contenido: z.any().optional(),
  editado_por: z.number().int().optional(),
  editado_en: z.date().optional(),
}).omit({id: true}).partial();
