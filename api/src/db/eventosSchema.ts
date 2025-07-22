import { pgTable, integer, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usersTable } from './usersSchema';
import { universidadesTable } from './universidadesSchema';

export const eventosTable = pgTable('eventos', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  titulo: varchar({ length: 200 }),
  descripcion: text(),
  tipo: varchar({ length: 100 }),
  creador_id: integer().references(() => usersTable.id),
  universidad_id: integer().references(() => universidadesTable.id),
  fecha_inicio: timestamp(),
  fecha_fin: timestamp(),
  enlace_acceso: text(),
  creado_en: timestamp().defaultNow(),
});

export const insertEventoSchema = z.object({
  titulo: z.string().max(200),
  descripcion: z.string(),
  tipo: z.string().max(100),
  creador_id: z.number().int(),
  universidad_id: z.number().int(),
  fecha_inicio: z.string().refine(val => !isNaN(Date.parse(val)), {
  message: 'fecha_inicio debe ser una fecha válida'
}).transform(val => new Date(val)),

fecha_fin: z.string().refine(val => !isNaN(Date.parse(val)), {
  message: 'fecha_fin debe ser una fecha válida'
}).transform(val => new Date(val)),

  enlace_acceso: z.string().nullable().optional(),
});

export const updateEventoSchema = z.object({
  titulo: z.string().max(200).optional(),
  descripcion: z.string().optional(),
  tipo: z.string().max(100).optional(),
  creador_id: z.number().int().optional(),
  universidad_id: z.number().int().optional(),
  fecha_inicio: z.string().refine(val => !isNaN(Date.parse(val)), {
  message: 'fecha_inicio debe ser una fecha válida'
}).transform(val => new Date(val)),

fecha_fin: z.string().refine(val => !isNaN(Date.parse(val)), {
  message: 'fecha_fin debe ser una fecha válida'
}).transform(val => new Date(val)),

  enlace_acceso: z.string().nullable().optional(),
}).partial();