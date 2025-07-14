// src/db/tokensInicialesAccesoSchema.ts
import { pgTable, integer, varchar, boolean, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usersTable } from './usersSchema';

export const tokensInicialesAccesoTable = pgTable('tokens_iniciales_acceso', {
  id: integer('id').primaryKey().notNull(),
  usuario_id: integer('usuario_id')
    .references(() => usersTable.id),
  token_acceso: varchar('token_acceso', { length: 100 }),
  usado: boolean('usado').default(false),
  generado_en: timestamp('generado_en').defaultNow(),
});

// Zod schemas
export const insertTokenInicialAccesoSchema = z.object({
  id: z.number(),
  usuario_id: z.number().int(),
  token_acceso: z.string().max(100),
  usado: z.boolean().optional(),
  generado_en: z.date().optional(),
}).omit({id:true});

export const updateTokenInicialAccesoSchema = z.object({
  id: z.number(),
  token_acceso: z.string().max(100).optional(),
  usado: z.boolean().optional(),
  generado_en: z.date().optional(),
}).omit({id:true}).partial();
