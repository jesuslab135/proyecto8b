// db/paginasColaborativasSchema.ts
import { pgTable, integer, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usuariosTable } from './usuariosSchema';
import { proyectosTable } from './proyectosSchema';

export const paginasColaborativasTable = pgTable('paginas_colaborativas', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  proyecto_id: integer().references(() => proyectosTable.id),
  titulo: varchar({ length: 200 }),
  descripcion: text(),
  creada_por: integer().references(() => usuariosTable.id),
  permisos_lectura: text().array(),
  permisos_escritura: text().array(),
  orden: integer().default(0),
  creada_en: timestamp().defaultNow()
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
