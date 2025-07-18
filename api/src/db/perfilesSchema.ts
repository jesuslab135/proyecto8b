import { pgTable, integer, text } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usersTable } from './usersSchema';

export const perfilesTable = pgTable('perfiles', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  usuario_id: integer().references(() => usersTable.id),
  cv_url: text(),
  skills: text(),
  historial_participacion: text(),
});

export const insertPerfilSchema = z.object({
  id: z.number().int(),
  usuario_id: z.number().int(),
  cv_url: z.string(),
  skills: z.string(),
  historial_participacion: z.string(),
}).omit({
  id: true,
});

export const updatePerfilSchema = z.object({
  id: z.number().int(),
  usuario_id: z.number().int().optional(),
  cv_url: z.string().optional(),
  skills: z.string().optional(),
  historial_participacion: z.string().optional(),
}).omit({
  id: true,
}).partial();
