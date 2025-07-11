// db/oportunidadesSchema.ts
import { pgTable, integer, varchar, text, date } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { universidadesTable } from './universidadesSchema';

export const oportunidadesTable = pgTable('oportunidades', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  titulo: varchar({ length: 200 }),
  descripcion: text(),
  tipo: varchar({ length: 100 }),
  universidad_id: integer().references(() => universidadesTable.id),
  fecha_limite: date(),
});

export const insertOportunidadSchema = z.object({
  id: z.number().int(),
  titulo: z.string().max(200),
  descripcion: z.string(),
  tipo: z.string().max(100),
  universidad_id: z.number().int(),
  fecha_limite: z.string(), // en formato ISO
}).omit({
  id: true,
});

export const updateOportunidadSchema = z.object({
  id: z.number().int(),
  titulo: z.string().max(200).optional(),
  descripcion: z.string().optional(),
  tipo: z.string().max(100).optional(),
  universidad_id: z.number().int().optional(),
  fecha_limite: z.string().optional(), // ISO date
}).omit({
  id: true,
}).partial();
