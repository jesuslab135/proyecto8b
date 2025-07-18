// db/hilosSchema.ts
import { pgTable, integer, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usersTable } from './usersSchema';
import { forosTable } from './forosSchema';

export const hilosTable = pgTable('hilos', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  foro_id: integer().references(() => forosTable.id),
  titulo: varchar({ length: 150 }),
  contenido: text(),
  creador_id: integer().references(() => usersTable.id),
  creado_en: timestamp().defaultNow(),
});

export const insertHilosSchema = z.object({
  id: z.number().int(),
  foro_id: z.number().int(),
  titulo: z.string().max(150),
  contenido: z.string(),
  creador_id: z.number().int(),
  creado_en: z.date().optional(),
}).omit({
  id: true,
});

export const updateHilosSchema = z.object({
  id: z.number().int(),
  foro_id: z.number().int().optional(),
  titulo: z.string().max(150).optional(),
  contenido: z.string().optional(),
  creador_id: z.number().int().optional(),
  creado_en: z.date().optional(),
}).omit({
  id: true,
}).partial();
