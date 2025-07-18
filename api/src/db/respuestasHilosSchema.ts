// db/repuestasHilosSchema.ts
import { pgTable, integer, text, timestamp} from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usersTable } from './usersSchema';
import { hilosTable } from './hilosSchema';

export const respuestasHilosTable = pgTable('respuestas_hilo', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  hilo_id: integer().references(() => hilosTable.id),
  usuario_id: integer().references(() => usersTable.id),
  contenido: text(),
  creado_en: timestamp().defaultNow(),
});

export const insertRespuestasHilosSchema = z.object({
  id: z.number().int(),
  hilo_id: z.number().int(),
  usuario_id: z.number().int(),
  contenido: z.string(),
  creado_en: z.date().optional(),
}).omit({
  id: true,
});

export const updateRespuestasHilosSchema = z.object({
  id: z.number().int(),
  hilo_id: z.number().int().optional(),
  usuario_id: z.number().int().optional(),
  contenido: z.string().optional(),
  creado_en: z.date().optional(),
}).omit({
  id: true,
}).partial();
