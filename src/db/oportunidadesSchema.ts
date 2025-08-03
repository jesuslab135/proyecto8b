// db/oportunidadesSchema.ts
import { pgTable, varchar, text, integer, date, timestamp, doublePrecision } from 'drizzle-orm/pg-core';
import { universidadesTable } from './universidadesSchema';
import { usuariosTable } from './usuariosSchema';
import { opportunityTypesTable } from './opportunityTypesSchema';
import { systemStatesTable } from './systemStatesSchema';
import { workModalitiesTable } from './workModalitiesSchema';
import { z } from 'zod';

export const oportunidadesTable = pgTable('oportunidades', {
  id: integer().primaryKey().notNull(),
  titulo: varchar({ length: 200 }),
  descripcion: text(),

  // Obsoleto en BD, usado temporalmente por el backend
  tipo: varchar({ length: 100 }),

  universidad_id: integer().references(() => universidadesTable.id),
  fecha_limite: date(),

  opportunity_type_id: integer().references(() => opportunityTypesTable.id), // FK a opportunity_types
  state_id: integer().references(() => systemStatesTable.id),                // FK a system_states
  created_by: integer().references(() => usuariosTable.id),                  // FK a usuarios

  empresa: varchar({ length: 150 }),
  salario_min: doublePrecision(),
  salario_max: doublePrecision(),
  modality_id: integer().references(() => workModalitiesTable.id),           // FK a work_modalities

  requisitos: text(),
  beneficios: text(),

  created_at: timestamp().defaultNow(),
  updated_at: timestamp(),
});

export const insertOportunidadSchema = z.object({
  titulo: z.string().max(200),
  descripcion: z.string(),
  tipo: z.string().max(100).optional(), // para compatibilidad temporal
  universidad_id: z.number().int(),
  fecha_limite: z.string().refine(val => !isNaN(Date.parse(val))).transform(val => new Date(val)),

  opportunity_type_id: z.number().int().optional(),
  state_id: z.number().int().optional(),
  created_by: z.number().int().optional(),
  empresa: z.string().max(150).optional(),
  salario_min: z.number().optional(),
  salario_max: z.number().optional(),
  modality_id: z.number().int().optional(),
  requisitos: z.string().optional(),
  beneficios: z.string().optional(),
});

export const updateOportunidadSchema = z.object({
  titulo: z.string().max(200).optional(),
  descripcion: z.string().optional(),
  tipo: z.string().max(100).optional(), // para compatibilidad temporal
  universidad_id: z.number().int().optional(),
  fecha_limite: z.string().refine(val => !isNaN(Date.parse(val))).transform(val => new Date(val)).optional(),

  opportunity_type_id: z.number().int().optional(),
  state_id: z.number().int().optional(),
  created_by: z.number().int().optional(),
  empresa: z.string().max(150).optional(),
  salario_min: z.number().optional(),
  salario_max: z.number().optional(),
  modality_id: z.number().int().optional(),
  requisitos: z.string().optional(),
  beneficios: z.string().optional(),
}).partial();
