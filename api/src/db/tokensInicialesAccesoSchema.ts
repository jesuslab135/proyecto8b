// db/tokensInicialesAccesoSchema.ts
import { pgTable, integer, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usuariosTable } from './usuariosSchema';

export const tokensInicialesAccesoTable = pgTable('tokens_iniciales_acceso', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  usuario_id: integer().references(() => usuariosTable.id),
  token_acceso: varchar({ length: 100 }),
  usado: boolean().default(false),
  generado_en: timestamp().defaultNow(),
  correo: varchar({ length: 150 }),
});

// Zod para inserción (omitimos ID)
export const insertTokenAccesoSchema = z.object({
  id: z.number(),
  usuario_id: z.number().optional(), // puede estar vacío si el usuario aún no existe
  token_acceso: z.string().max(100),
  usado: z.boolean().optional(),
  generado_en: z.date().optional(),
  correo: z.string().max(150),
}).omit({ id: true });

// Zod para actualización parcial
export const updateTokenAccesoSchema = z.object({
  id: z.number(),
  token_acceso: z.string().max(100).optional(),
  usuario_id: z.number().optional(),
  usado: z.boolean().optional(),
  generado_en: z.date().optional(),
  correo: z.string().email().max(150).optional(),
}).omit({id: true}).partial();
