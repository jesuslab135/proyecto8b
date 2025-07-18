// db/postulacionesSchema.ts
import { pgTable, integer, text, varchar, date } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usersTable } from './usersSchema';
import { oportunidadesTable } from './oportunidadesSchema';


export const postulacionesTable = pgTable('postulaciones', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  usuario_id: integer().references(() => usersTable.id),
  oportunidad_id: integer().references(() => oportunidadesTable.id),
  mensaje: text(),
  estado: varchar({ length: 50 }).default('pendiente'),
  fecha: date().defaultNow(),
});

export const insertPostulacionesSchema = z.object({
  id: z.number().int(),
  usuario_id: z.number().int(),
  oportunidad_id: z.number().int(),
  mensaje: z.string().max(1000),
  estado: z.string().max(50),
  fecha: z.date(),
}).omit({
  id: true,
});

export const updatePostulacionesSchema = z.object({
  id: z.number().int(),
  usuario_id: z.number().int().optional(),
  oportunidad_id: z.number().int().optional(),
  mensaje: z.string().max(1000).optional(),
  estado: z.string().max(50).optional(),
  fecha: z.date().optional(),
}).omit({
  id: true,
}).partial();