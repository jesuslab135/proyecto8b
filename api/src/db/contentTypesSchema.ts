// db/contentTypesSchema.ts
import { pgTable, integer, varchar, text, boolean, timestamp, unique } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const contentTypesTable = pgTable('content_types', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 100 }).notNull().unique(),
  description: text(),
  is_active: boolean().default(true),
  created_at: timestamp().defaultNow()
});

export const insertContentTypeSchema = z.object({
  name: z.string().max(100),
  description: z.string().optional(),
  is_active: z.boolean().optional()
});
export const updateContentTypeSchema = z.object({
  name: z.string().max(100).optional(),
  description: z.string().optional(),
  is_active: z.boolean().optional()
}).partial();
