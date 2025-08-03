// db/seguimientosSchema.ts
import { pgTable, integer, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usuariosTable } from './usuariosSchema';
import { proyectosTable } from './proyectosSchema';

export const seguimientosTable = pgTable('seguimientos', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  seguidor_id: integer().references(() => usuariosTable.id),
  seguido_usuario_id: integer().references(() => usuariosTable.id),
  seguido_proyecto_id: integer().references(() => proyectosTable.id),
  creado_en: timestamp().defaultNow()
});

// Validación de entrada
export const insertSeguimientoSchema = z.object({
  seguidor_id: z.number().int(),
  seguido_usuario_id: z.number().int().nullable().optional(),
  seguido_proyecto_id: z.number().int().nullable().optional(),
  creado_en: z.date().optional()
}).refine(data =>
  (data.seguido_usuario_id && !data.seguido_proyecto_id) ||
  (!data.seguido_usuario_id && data.seguido_proyecto_id), {
  message: 'Debes especificar uno y solo uno: seguido_usuario_id o seguido_proyecto_id'
});

export const updateSeguimientoSchema = z.object({
  seguidor_id: z.number().int().optional(),
  seguido_usuario_id: z.number().int().nullable().optional(),
  seguido_proyecto_id: z.number().int().nullable().optional(),
  creado_en: z.date().optional()
}).refine(data =>
  (data.seguido_usuario_id && !data.seguido_proyecto_id) ||
  (!data.seguido_usuario_id && data.seguido_proyecto_id) ||
  (!data.seguido_usuario_id && !data.seguido_proyecto_id), {
  message: 'Debes especificar uno y solo uno: seguido_usuario_id o seguido_proyecto_id'
});
