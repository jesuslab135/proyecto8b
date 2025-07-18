// db/proyectosSchema.ts
import { pgTable, integer, varchar, text, boolean, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usersTable } from './usersSchema';
import { universidadesTable } from './universidadesSchema';

export const proyectosTable = pgTable('proyectos', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar({ length: 200 }),
  descripcion: text(),
  creador_id: integer().references(() => usersTable.id),
  universidad_id: integer().references(() => universidadesTable.id),
  estado_verificacion: varchar({ length: 50 }),
  vista_publica: boolean().default(true),
  creado_en: timestamp().defaultNow(),
});

export const insertProyectoSchema = z.object({
  id: z.number(),
  nombre: z.string().max(200),
  descripcion: z.string(),
  creador_id: z.number().int(),
  universidad_id: z.number().int(),
  estado_verificacion: z.string().max(50),
  vista_publica: z.boolean().optional(),
  creado_en: z.string().optional(), // ISO string
}).omit({id: true});

export const updateProyectoSchema = z.object({
  id: z.number(),
  nombre: z.string().max(200),
  descripcion: z.string(),
  creador_id: z.number().int(),
  universidad_id: z.number().int(),
  estado_verificacion: z.string().max(50),
  vista_publica: z.boolean().optional(),
  creado_en: z.string().optional(), // ISO string
}).omit({id:true}).partial();