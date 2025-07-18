// db/perfilesSchema.ts
import { pgTable, integer, text } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usersTable } from './usersSchema';


export const perfilesTable = pgTable('perfiles', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  usuario_id: integer().references(() => usersTable.id),
  cv_url:text(),
  skills: text(),
  historial_participaciones: text(),
});

export const insertPerfilesSchema = z.object({
  id: z.number().int(),
  usuario_id: z.number().int(),
  cv_url: z.string().url(),
  skills: z.string().max(500),
  historial_participaciones: z.string().max(1000),
}).omit({
  id: true,
});

export const updatePerfilesSchema = z.object({
  id: z.number().int(),
  usuario_id: z.number().int().optional(),
  cv_url: z.string().url().optional(),
  skills: z.string().max(500).optional(),
  historial_participaciones: z.string().max(1000).optional(),
}).omit({
  id: true,
}).partial();
