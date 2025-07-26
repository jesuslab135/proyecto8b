// src/db/bloquesSchema.ts
import { pgTable, integer, varchar, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usuariosTable } from './usuariosSchema';
import { paginasColaborativasTable } from './paginasColaborativasSchema';

// Definición de la tabla bloques
export const bloquesTable = pgTable('bloques', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  pagina_id: integer()
    .references(() => paginasColaborativasTable.id),
  tipo: varchar( { length: 50 }),
  contenido: jsonb(),
  orden: integer().default(0),
  creado_por: integer()
    .references(() => usuariosTable.id),
  creado_en: timestamp().defaultNow()
});

// Validación con Zod
export const insertBloqueSchema = z.object({
  pagina_id: z.number().optional(),
  tipo: z.string().max(50),
  contenido: z.any(),
  orden: z.number().optional(),
  creado_por: z.number().optional(),
});

export const updateBloqueSchema = z.object({
  pagina_id: z.number().optional(),
  tipo: z.string().max(50),
  contenido: z.any(),
  orden: z.number().optional(),
  creado_por: z.number().optional(),
}).partial();


