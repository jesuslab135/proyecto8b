import { pgTable, integer, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usuariosTable } from './usuariosSchema';

export const conversacionesTable = pgTable('conversaciones', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  usuario_1_id: integer().references(() => usuariosTable.id),
  usuario_2_id: integer().references(() => usuariosTable.id),
  creado_en: timestamp().defaultNow(),
});

export const insertConversacionSchema = z.object({
  usuario_1_id: z.number().int(),
  usuario_2_id: z.number().int(),
  creado_en: z.date().optional(),
});

export const updateConversacionSchema = z.object({
  usuario_1_id: z.number().int().optional(),
  usuario_2_id: z.number().int().optional(),
  creado_en: z.date().optional(),
}).partial();
