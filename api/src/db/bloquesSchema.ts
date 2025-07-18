// db/experienciaUsuarioSchema.ts
import { pgTable, integer, varchar, text, timestamp, jsonb } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usersTable } from './usersSchema';
import { paginasColaborativasTable } from './paginasColaborativasSchema';

export const bloquesTable = pgTable('bloques', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  pagina_id: integer().references(() => paginasColaborativasTable.id),
  tipo: varchar({ length: 50 }),
  contenido: jsonb(),
  bloque_padre_id: integer(),
  orden: integer(),
  creado_por: integer().references(() => usersTable.id),
  creado_en: timestamp().defaultNow(),
});

export const insertBloquesSchema = z.object({
  id: z.number().int(),
  pagina_id: z.number().int(),
  tipo: z.string().max(50),
  contenido: z.object({}).passthrough(),
  bloque_padre_id: z.number().int(),
  orden: z.number().int(),
  creado_por: z.number().int(),
  creado_en: z.date(),
}).omit({
  id: true,
});

export const updateBloquesSchema = z.object({
  id: z.number().int(),
  pagina_id: z.number().int().optional(),
  tipo: z.string().max(50).optional(),
  contenido: z.object({}).passthrough().optional(),
  bloque_padre_id: z.number().int().optional(),
  orden: z.number().int().optional(),
  creado_por: z.number().int().optional(),
  creado_en: z.date().optional(),
}).omit({
  id: true,
}).partial();
