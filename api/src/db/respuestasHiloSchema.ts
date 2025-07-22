// src/db/respuestasHiloSchema.ts
import { pgTable, integer, text, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { hilosTable } from './hilosSchema';
import { usersTable } from './usersSchema';

export const respuestasHiloTable = pgTable('respuestas_hilo', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  hilo_id: integer().references(() => hilosTable.id),
  usuario_id: integer().references(() => usersTable.id),
  contenido: text(),
  creado_en: timestamp().defaultNow(),
});

export const insertRespuestaHiloSchema = z.object({
  id: z.number().int(),
  hilo_id: z.number().int(),
  usuario_id: z.number().int(),
  contenido: z.string().min(1),
  creado_en: z.date().optional(),
}).omit({
  id: true,
});

export const updateRespuestaHiloSchema = z.object({
  id: z.number().int(),
  hilo_id: z.number().int().optional(),
  usuario_id: z.number().int().optional(),
  contenido: z.string().min(1).optional(),
  creado_en: z.date().optional(),
}).omit({
  id: true,
}).partial();
