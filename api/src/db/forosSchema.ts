import { pgTable, integer, varchar, text } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const forosTable = pgTable('foros', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar({ length: 100 }),
  descripcion: text(),
});

export const insertForoSchema = z.object({
  id: z.number().int(),
  nombre: z.string().max(100),
  descripcion: z.string().nullable().optional(),
}).omit({
  id: true,
});

export const updateForoSchema = z.object({
  id: z.number().int(),
  nombre: z.string().max(100),
  descripcion: z.string().nullable().optional(),
}).omit({
  id: true,
}).partial();
