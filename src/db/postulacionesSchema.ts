// db/participacionesProyectoSchema.ts
import { pgTable, integer, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usuariosTable } from './usuariosSchema';
import { oportunidadesTable } from './oportunidadesSchema';

export const postulacionesTable = pgTable('postulaciones', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  usuario_id: integer().references(() => usuariosTable.id),
  oportunidad_id: integer().references(() => oportunidadesTable.id),
  mensaje: text(),
  estado: varchar({ length: 50 }),
  fecha: timestamp().defaultNow(),
});

export const insertPostulacionSchema = z.object({
  usuario_id: z.number().int(),
  oportunidad_id: z.number().int(),
  mensaje: z.string(),
  estado: z.string().max(50).optional()
});

export const updatePostulacionSchema = z.object({
  usuario_id: z.number().int().optional(),
  oportunidad_id: z.number().int().optional(),
  mensaje: z.string().optional(),
  estado: z.string().max(50).optional()
}).partial();
