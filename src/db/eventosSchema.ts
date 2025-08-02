// db/eventosSchema.ts
import { pgTable, varchar, integer, timestamp, text } from 'drizzle-orm/pg-core';
import { universidadesTable } from './universidadesSchema';
import { usuariosTable } from './usuariosSchema';
import { eventTypesTable } from './eventTypesSchema';
import { systemStatesTable } from './systemStatesSchema';
import { z } from 'zod';

export const eventosTable = pgTable('eventos', {
  id: integer().primaryKey().notNull(),
  titulo: varchar({ length: 200 }).notNull(),
  descripcion: text().notNull(),

  // Obsoleto en base de datos, usado temporalmente por el backend
  tipo: varchar({ length: 100 }).notNull(),

  creador_id: integer().references(() => usuariosTable.id).notNull(), // FK a usuarios
  universidad_id: integer().references(() => universidadesTable.id).notNull(), // FK a universidades

  fecha_inicio: timestamp().notNull(),
  fecha_fin: timestamp().notNull(),

  enlace_acceso: varchar({ length: 255 }),
  creado_en: timestamp().defaultNow(),

  event_type_id: integer().references(() => eventTypesTable.id), // FK a event_types
  state_id: integer().references(() => systemStatesTable.id),    // FK a system_states

  ubicacion: text(),
  capacidad_maxima: integer(),
  updated_at: timestamp(),
});

export const insertEventoSchema = z.object({
  titulo: z.string().max(200),
  descripcion: z.string(),
  tipo: z.string().max(100), // para compatibilidad temporal
  creador_id: z.number().int(),
  universidad_id: z.number().int(),
  fecha_inicio: z.string().refine(val => !isNaN(Date.parse(val))).transform(val => new Date(val)),
  fecha_fin: z.string().refine(val => !isNaN(Date.parse(val))).transform(val => new Date(val)),
  enlace_acceso: z.string().max(255).optional(),
  event_type_id: z.number().int().optional(),
  state_id: z.number().int().optional(),
  ubicacion: z.string().optional(),
  capacidad_maxima: z.number().int().optional(),
});

export const updateEventoSchema = z.object({
  titulo: z.string().max(200).optional(),
  descripcion: z.string().optional(),
  tipo: z.string().max(100).optional(), // para compatibilidad temporal
  creador_id: z.number().int().optional(),
  universidad_id: z.number().int().optional(),
  fecha_inicio: z.string().refine(val => !isNaN(Date.parse(val))).transform(val => new Date(val)).optional(),
  fecha_fin: z.string().refine(val => !isNaN(Date.parse(val))).transform(val => new Date(val)).optional(),
  enlace_acceso: z.string().max(255).optional(),
  event_type_id: z.number().int().optional(),
  state_id: z.number().int().optional(),
  ubicacion: z.string().optional(),
  capacidad_maxima: z.number().int().optional(),
}).partial();