// db/universidadesSchema.ts
import { pgTable, integer, varchar, text } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const universidadesTable = pgTable('universidades', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar({ length: 150 }),
  dominio_correo: varchar({ length: 100 }),
  logo_url: text(),
});

export const insertUniversidadSchema = z.object({
  id: z.number().int(),
  nombre: z.string().max(150),
  dominio_correo: z.string().max(100),
  logo_url: z.string().nullable().optional(),
}).omit({
    id: true,
});

export const updateUniversidadSchema = z.object({
  id: z.number().int(),
  nombre: z.string().max(150),
  dominio_correo: z.string().max(100),
  logo_url: z.string().nullable().optional(),
}).omit({
    id: true,
}).partial();
