// src/db/bloquesSchema.ts
import { pgTable, integer, varchar, jsonb, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usersTable } from './usersSchema';
import { paginasColaborativasTable } from './paginasColaborativasSchema';

// Definición de la tabla bloques
export const bloquesTable = pgTable('bloques', {
  id: integer('id').primaryKey().notNull(),
  pagina_id: integer('pagina_id')
    .references(() => paginasColaborativasTable.id),
  tipo: varchar('tipo', { length: 50 }),
  contenido: jsonb('contenido'),
  orden: integer('orden').default(0),
  creado_por: integer('creado_por')
    .references(() => usersTable.id),
  creado_en: timestamp('creado_en').defaultNow()
});

// Validación con Zod
export const insertBloqueSchema = z.object({
  id: z.number(),
  pagina_id: z.number().optional(),
  tipo: z.string().max(50),
  contenido: z.any(),
  orden: z.number().optional(),
  creado_por: z.number().optional(),
}).omit({id: true});

export const updateBloqueSchema = z.object({
  id: z.number(),
  pagina_id: z.number().optional(),
  tipo: z.string().max(50),
  contenido: z.any(),
  orden: z.number().optional(),
  creado_por: z.number().optional(),
}).omit({id: true}).partial();


