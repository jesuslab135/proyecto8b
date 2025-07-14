// db/ofertasLaborales.ts
import { pgTable, integer, varchar, timestamp, text, date } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { ofertasLaboralesTable } from './ofertasLaboralesSchema';
import { usersTable } from './usersSchema';

export const postulacioneslaboralesTable = pgTable('postulaciones_laborales', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  usuario_id: integer().references(() => usersTable.id),
  mensaje: text(),
  estado: varchar({ length:50}),
  fecha: timestamp("fecha_publicacion").defaultNow(),
  oferta_laboral_id: integer().references(() => ofertasLaboralesTable.id),
});

export const insertPostulacionesLaboralesSchema = z.object({
  id: z.number().int(),
  usuario_id: z.number().int(),
  mensaje: z.string(),
  estado: z.string().max(50).default('pendiente'),
  fecha: z.date().optional(),
  oferta_laboral_id: z.number().int(), 
}).omit({
  id: true,
});

export const updatePostulacionesLaboralesSchema = z.object({
  id: z.number().int(),
  usuario_id: z.number().int(),
  mensaje: z.string().optional(),
  estado: z.string().max(50),
  fecha: z.date(),
  oferta_laboral_id: z.number().int(),
}).omit({
  id: true,
}).partial();