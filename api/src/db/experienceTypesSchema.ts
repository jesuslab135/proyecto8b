// db/experienceTypesSchema.ts
import { pgTable, integer, varchar, text, boolean, unique } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const experienceTypesTable = pgTable('experience_types', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 50 }).notNull().unique(),
  description: text(),
  is_active: boolean().default(true)
});

export const insertExperienceTypeSchema = z.object({
  name: z.string().max(50),
  description: z.string().optional(),
  is_active: z.boolean().optional()
});
export const updateExperienceTypeSchema = z.object({
  name: z.string().max(50).optional(),
  description: z.string().optional(),
  is_active: z.boolean().optional()
}).partial();
