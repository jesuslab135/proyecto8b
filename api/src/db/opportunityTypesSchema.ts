// db/opportunityTypesSchema.ts
import { pgTable, integer, varchar, text, boolean, timestamp, unique } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const opportunityTypesTable = pgTable('opportunity_types', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 100 }).notNull().unique(),
  description: text(),
  icon: varchar({ length: 50 }),       // Nuevo: Para interfaz de usuario:contentReference[oaicite:13]{index=13}
  is_active: boolean().default(true),
  created_at: timestamp().defaultNow()
});

export const insertOpportunityTypeSchema = z.object({
  name: z.string().max(100),
  description: z.string().optional(),
  icon: z.string().max(50).optional(),
  is_active: z.boolean().optional()
});
export const updateOpportunityTypeSchema = z.object({
  name: z.string().max(100).optional(),
  description: z.string().optional(),
  icon: z.string().max(50).optional(),
  is_active: z.boolean().optional()
}).partial();
