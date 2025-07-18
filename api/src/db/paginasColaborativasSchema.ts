// db/paginasColaborativasSchema.ts
import { pgTable, integer, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usersTable } from './usersSchema';
import { proyectosTable } from './proyectosSchema';

export const paginasColaborativasTable = pgTable('paginas_colaborativas', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  proyecto_id: integer('proyecto_id').references(() => proyectosTable.id),
  titulo: varchar('titulo', { length: 200 }),
  descripcion: text('descripcion'),
  creada_por: integer('creada_por').references(() => usersTable.id),
  permisos_lectura: text('permisos_lectura').array(),
  permisos_escritura: text('permisos_escritura').array(),
  orden: integer('orden').default(0),
  creada_en: timestamp('creada_en').defaultNow()
});

// Zod schemas
export const insertPaginaColaborativaSchema = z.object({
  id: z.number().int(),
  proyecto_id: z.number().int(),
  titulo: z.string().max(200),
  descripcion: z.string(),
  creada_por: z.number().int(),
  permisos_lectura: z.array(z.string()),
  permisos_escritura: z.array(z.string()),
  orden: z.number().optional(),
  creada_en: z.date().optional()
}).omit({
  id: true
});

export const updatePaginaColaborativaSchema = z.object({
  id: z.number().int(),
  proyecto_id: z.number().int().optional(),
  titulo: z.string().max(200).optional(),
  descripcion: z.string().optional(),
  creada_por: z.number().int().optional(),
  permisos_lectura: z.array(z.string()).optional(),
  permisos_escritura: z.array(z.string()).optional(),
  orden: z.number().optional(),
  creada_en: z.date().optional()
}).omit({
  id: true
}).partial();
