import { pgTable, integer, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usuariosTable } from './usuariosSchema';
import { proyectosTable } from './proyectosSchema';

export const paginasColaborativasTable = pgTable('paginas_colaborativas', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  proyecto_id: integer().references(() => proyectosTable.id, { onDelete: 'cascade' }),
  titulo: varchar({ length: 200 }),
  descripcion: text(),
  creada_por: integer().references(() => usuariosTable.id),
  permisos_lectura: text().array().notNull(),
  permisos_escritura: text().array().notNull(),
  orden: integer().default(0),
  creada_en: timestamp().defaultNow()
});

export const insertPaginaColaborativaSchema = z.object({
  titulo:           z.string(),
  descripcion:      z.string(),
  proyecto_id:      z.number(),
  orden:            z.number().optional(),
  permisos_lectura:  z.array(z.string()).optional().default([]),
  permisos_escritura:z.array(z.string()).optional().default([])
});

export const updatePaginaColaborativaSchema = z.object({
  proyecto_id: z.number().int().optional(),
  titulo: z.string().max(200).optional(),
  descripcion: z.string().optional(),
  permisos_lectura: z.array(z.string()).optional(),
  permisos_escritura: z.array(z.string()).optional(),
  orden: z.number().optional()
}).partial();
