// db/reportesSchema.ts
import { pgTable, integer, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usuariosTable } from './usuariosSchema';

export const reportesTable = pgTable('reportes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  reportante_id: integer().references(() => usuariosTable.id),
  usuario_reportado_id: integer().references(() => usuariosTable.id),
  tipo_contenido: varchar({ length: 100 }),
  contenido_id: integer(),
  motivo: text(),
  estado: varchar({ length: 50 }),
  fecha: timestamp().defaultNow()
});

export const insertReporteSchema = z.object({
  reportante_id: z.number().int(),
  usuario_reportado_id: z.number().int(),
  tipo_contenido: z.string().max(100),
  contenido_id: z.number().int(),
  motivo: z.string(),
  estado: z.string().max(50),
  fecha: z.date().optional()
});

export const updateReporteSchema = z.object({
  reportante_id: z.number().int().optional(),
  usuario_reportado_id: z.number().int().optional(),
  tipo_contenido: z.string().max(100).optional(),
  contenido_id: z.number().int().optional(),
  motivo: z.string().optional(),
  estado: z.string().max(50).optional(),
  fecha: z.date().optional()
}).partial();
