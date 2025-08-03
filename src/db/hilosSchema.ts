// db/hilosSchema.ts
import { pgTable, integer, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { forosTable } from './forosSchema';
import { usuariosTable } from './usuariosSchema';

export const hilosTable = pgTable('hilos', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  foro_id: integer().references(() => forosTable.id),
  titulo: varchar({ length: 150 }),
  contenido: text(),
  creador_id: integer().references(() => usuariosTable.id),
  creado_en: timestamp().defaultNow(),
});

export const insertHiloSchema = z.object({
  foro_id: z.number().int(),
  titulo: z.string().max(150),
  contenido: z.string(),
  creador_id: z.number().int(),
  creado_en: z.date().optional(),
});

export const updateHiloSchema = z.object({
  foro_id: z.number().int().optional(),
  titulo: z.string().max(150).optional(),
  contenido: z.string().optional(),
  creador_id: z.number().int().optional(),
  creado_en: z.date().optional(),
}).partial();
