// db/tagsSchema.ts
import { pgTable, integer, varchar } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const tagsTable = pgTable('tags', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar({ length: 50 }),
});

export const insertTagSchema = z.object({
  id: z.number().int(),
  nombre: z.string().max(50),
}).omit({
  id: true,
});

export const updateTagSchema = z.object({
  id: z.number().int(),
  nombre: z.string().max(50),
}).omit({
  id: true,
}).partial();
