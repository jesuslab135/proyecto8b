// db/ofertasLaborales.ts
import { pgTable, integer, varchar, timestamp, text, date } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { ofertasLaboralesTable } from './ofertasLaboralesSchema';
import { usuariosTable } from './usuariosSchema';

export const postulacioneslaboralesTable = pgTable('postulaciones_laborales', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  usuario_id: integer().references(() => usuariosTable.id),
  mensaje: text(),
  estado: varchar({ length: 50 }),
  fecha: timestamp().defaultNow(), // <- CORREGIDO
  oferta_laboral_id: integer().references(() => ofertasLaboralesTable.id),
});

export const insertPostulacionesLaboralesSchema = z.object({
  usuario_id: z.number().int(),
  mensaje: z.string(),
  estado: z.string().max(50).default('pendiente'),
  fecha: z.date().optional(),
  oferta_laboral_id: z.number().int(), 
});

export const updatePostulacionesLaboralesSchema = z.object({
  usuario_id: z.number().int(),
  mensaje: z.string().optional(),
  estado: z.string().max(50),
  fecha: z.date(),
  oferta_laboral_id: z.number().int(),
}).partial();