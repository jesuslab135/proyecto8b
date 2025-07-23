// db/paginasColaborativasSchema.ts
import { pgTable, integer, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usuariosTable } from './usuariosSchema';
import { proyectosTable } from './proyectosSchema';

export const paginasColaborativasTable = pgTable('paginas_colaborativas', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  proyecto_id: integer('proyecto_id').references(() => proyectosTable.id),
  titulo: varchar('titulo', { length: 200 }),
  descripcion: text('descripcion'),
  creada_por: integer('creada_por').references(() => usuariosTable.id),
  permisos_lectura: text('permisos_lectura').array(),
  permisos_escritura: text('permisos_escritura').array(),
  orden: integer('orden').default(0),
  creada_en: timestamp('creada_en').defaultNow()
});

// Zod schemas
export const insertPaginaColaborativaSchema = z.object({
  proyecto_id: z.number().int(),
  titulo: z.string().max(200),
  descripcion: z.string(),
  creada_por: z.number().int(),
  permisos_lectura: z.array(z.string()),
  permisos_escritura: z.array(z.string()),
  orden: z.number().optional(),
  creada_en: z.date().optional()
});

export const updatePaginaColaborativaSchema = z.object({
  proyecto_id: z.number().int().optional(),
  titulo: z.string().max(200).optional(),
  descripcion: z.string().optional(),
  creada_por: z.number().int().optional(),
  permisos_lectura: z.array(z.string()).optional(),
  permisos_escritura: z.array(z.string()).optional(),
  orden: z.number().optional(),
  creada_en: z.date().optional()
}).partial();
