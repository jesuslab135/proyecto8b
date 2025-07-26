// db/proyectosSchema.ts
import { pgTable, integer, varchar, text, boolean, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usuariosTable } from './usuariosSchema';
import { universidadesTable } from './universidadesSchema';

export const proyectosTable = pgTable('proyectos', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar({ length: 200 }),
  descripcion: text(),
  creador_id: integer().references(() => usuariosTable.id),
  universidad_id: integer().references(() => universidadesTable.id),
  estado_verificacion: varchar({ length: 50 }),
  vista_publica: boolean().default(true),
  creado_en: timestamp().defaultNow(),
});

export const insertProyectoSchema = z.object({
  nombre: z.string().max(200),
  descripcion: z.string(),
  creador_id: z.number().int(),
  universidad_id: z.number().int(),
  estado_verificacion: z.string().max(50),
  vista_publica: z.boolean().optional(),
  creado_en: z.string().optional(), // ISO string
});

export const updateProyectoSchema = z.object({
  nombre: z.string().max(200),
  descripcion: z.string(),
  creador_id: z.number().int(),
  universidad_id: z.number().int(),
  estado_verificacion: z.string().max(50),
  vista_publica: z.boolean().optional(),
  creado_en: z.string().optional(), // ISO string
}).partial();