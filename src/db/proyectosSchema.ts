import { pgTable, integer, varchar, text, boolean, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usuariosTable } from './usuariosSchema';
import { universidadesTable } from './universidadesSchema';
import { systemStatesTable } from './systemStatesSchema';

export const proyectosTable = pgTable('proyectos', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar({ length: 200 }),
  descripcion: text(),
  creador_id: integer().references(() => usuariosTable.id),
  universidad_id: integer().references(() => universidadesTable.id),
  estado_verificacion: varchar({ length: 50 }),
  vista_publica: boolean().default(true),
  creado_en: timestamp().defaultNow(),
  repositorio_url: text(),
  demo_url: text(),
  updated_at: timestamp(),
  state_id: integer().references(() => systemStatesTable.id)
});

export const insertProyectoSchema = z.object({
  nombre: z.string().max(200).optional(),
  descripcion: z.string().optional(),
  creador_id: z.number().int().optional(),
  universidad_id: z.number().int().optional(),
  estado_verificacion: z.string().max(50).optional(),
  vista_publica: z.boolean().optional(),
  creado_en: z.string().optional(), // ISO string
  repositorio_url: z.string().optional(),
  demo_url: z.string().optional(),
  updated_at: z.string().optional(), // ISO string
  state_id: z.number().int().optional()
});

export const updateProyectoSchema = z.object({
  nombre: z.string().max(200).optional(),
  descripcion: z.string().optional(),
  creador_id: z.number().int().optional(),
  universidad_id: z.number().int().optional(),
  estado_verificacion: z.string().max(50).optional(),
  vista_publica: z.boolean().optional(),
  creado_en: z.string().optional(), // ISO string
  repositorio_url: z.string().optional(),
  demo_url: z.string().optional(),
  updated_at: z.string().optional(), // ISO string
  state_id: z.number().int().optional()
}).partial();
