// db/reportesSchema.ts
import { pgTable, integer, varchar, text, timestamp} from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usersTable } from './usersSchema';

export const reportesTable = pgTable('reportes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  reportante_id: integer().references(() => usersTable.id),
  usuario_reportado_id: integer().references(() => usersTable.id),
  tipo_contenido: varchar({ length: 100 }),
  contenido_id: integer(),
  motivo: text(),
  estado: varchar({ length: 50 }).default('pendiente'),
  fecha: timestamp().defaultNow(),
});

export const insertReportesSchema = z.object({
  id: z.number().int(),
  reportante_id: z.number().int(),
  usuario_reportado_id: z.number().int(),
  tipo_contenido: z.string().max(100),
  contenido_id: z.number().int(),
  motivo: z.string(),
  estado: z.string().max(50).default('pendiente'),
  fecha: z.date(),
}).omit({
  id: true,
});

export const updateReportesSchema = z.object({
  id: z.number().int(),
  reportante_id: z.number().int().optional(),
  usuario_reportado_id: z.number().int().optional(),
  tipo_contenido: z.string().max(100).optional(),
  contenido_id: z.number().int().optional(),
  motivo: z.string().optional(),
  estado: z.string().max(50).default('pendiente').optional(),
  fecha: z.date().optional(),
}).omit({
  id: true,
}).partial();
