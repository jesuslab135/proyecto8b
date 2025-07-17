// db/universidadesSchema.ts
import { pgTable, integer, varchar, text } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const universidadesTable = pgTable('universidades', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar({ length: 150 }),
  dominio_correo: varchar({ length: 100 }),
  logo_url: text(),
});

// Schema para crear (sin id)
export const insertUniversidadSchema = z.object({
  nombre: z.string().max(150),
  dominio_correo: z.string().max(100),
  logo_url: z.string().nullable().optional(),
});

// Schema para actualizar (sin id y parcial)
export const updateUniversidadSchema = z.object({
  nombre: z.string().max(150),
  dominio_correo: z.string().max(100),
  logo_url: z.string().nullable().optional(),
}).partial();
