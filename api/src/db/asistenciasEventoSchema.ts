import { pgTable, integer, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { eventosTable } from './eventosSchema';
import { usuariosTable } from './usuariosSchema';

export const asistenciasEventoTable = pgTable('asistencias_evento', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  evento_id: integer().references(() => eventosTable.id),
  usuario_id: integer().references(() => usuariosTable.id),
  registrado_en: timestamp().defaultNow(),
});

export const insertAsistenciaEventoSchema = z.object({
  evento_id: z.number().int(),
  usuario_id: z.number().int(),
  registrado_en: z.date().optional(),
});

export const updateAsistenciaEventoSchema = z.object({
  evento_id: z.number().int().optional(),
  usuario_id: z.number().int().optional(),
  registrado_en: z.date().optional(),
}).partial();
