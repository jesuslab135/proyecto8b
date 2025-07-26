// src/db/versionesBloquesSchema.ts
import { pgTable, integer, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { bloquesTable } from './bloquesSchema';
import { usuariosTable } from './usuariosSchema';

export const versionesBloquesTable = pgTable('versiones_bloques', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  bloque_id: integer().references(() => bloquesTable.id).notNull(),
  contenido: jsonb(),
  editado_por: integer().references(() => usuariosTable.id),
  editado_en: timestamp().defaultNow(),
});

export const insertVersionBloqueSchema = z.object({
  bloque_id: z.number().int(),
  contenido: z.any(),
  editado_por: z.number().int(),
  editado_en: z.date().optional(),
});

export const updateVersionBloqueSchema = z.object({
  contenido: z.any().optional(),
  editado_por: z.number().int().optional(),
  editado_en: z.date().optional(),
}).partial();
