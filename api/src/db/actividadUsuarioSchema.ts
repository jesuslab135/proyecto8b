import { pgTable, integer, varchar, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usuariosTable } from './usuariosSchema';

export const actividadUsuarioTable = pgTable('actividad_usuario', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  usuario_id: integer().references(() => usuariosTable.id),
  tipo_actividad: varchar({ length: 100 }),
  objeto_id: integer(),
  contexto: varchar({ length: 50 }),
  fecha: timestamp().defaultNow(),
});

export const insertActividadUsuarioSchema = z.object({
  usuario_id: z.number().int(),
  tipo_actividad: z.string().max(100),
  objeto_id: z.number().int(),
  contexto: z.string().max(50)
});

export const updateActividadUsuarioSchema = z.object({
  usuario_id: z.number().int().optional(),
  tipo_actividad: z.string().max(100).optional(),
  objeto_id: z.number().int().optional(),
  contexto: z.string().max(50).optional()
}).partial();
