// db/paginasColaborativasSchema.ts
import { pgTable, integer, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usersTable } from './usersSchema';
import { proyectosTable } from './proyectosSchema';


export const paginasColaborativasTable = pgTable('paginas_colaborativas', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  proyecto_id: integer().references(() => proyectosTable.id),
  titulo: varchar({ length: 200 }),
  descripcion: text(),
  creada_por: integer().references(() => usersTable.id),
  permisos_lectura: text().default('public'),
  permisos_escritura: text().default('public'),
  orden: integer().default(0),
  creada_en: timestamp().defaultNow(),
});

export const insertPaginasColaborativasSchema = z.object({
  id: z.number().int(),
  proyecto_id: z.number().int(),
  titulo: z.string().max(200),
  descripcion: z.string(),
  creada_por: z.number().int(),
  permisos_lectura: z.string().default('public'),
  permisos_escritura: z.string().default('public'),
  orden: z.number().int(),
  creada_en: z.date().optional(),
}).omit({
  id: true,
});

export const updatePaginasColaborativasSchema = z.object({
  id: z.number().int(),
  proyecto_id: z.number().int().optional(),
  titulo: z.string().max(200).optional(),
  descripcion: z.string().optional(),
  creada_por: z.number().int().optional(),
  permisos_lectura: z.string().optional(),
  permisos_escritura: z.string().optional(),
  orden: z.number().int().optional(),
  creada_en: z.date().optional(),
}).omit({
  id: true,
}).partial();
