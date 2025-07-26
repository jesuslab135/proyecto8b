// db/eventTypesSchema.ts
import { pgTable, integer, varchar, text, boolean, timestamp, unique } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const eventTypesTable = pgTable('event_types', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 100 }).notNull().unique(),  // Nombre del tipo de evento (único):contentReference[oaicite:10]{index=10}
  description: text(),                                // Descripción del tipo de evento
  icon: varchar({ length: 50 }),                      // Nuevo: Para interfaz de usuario:contentReference[oaicite:11]{index=11}
  is_active: boolean().default(true),
  created_at: timestamp().defaultNow()
});

export const insertEventTypeSchema = z.object({
  name: z.string().max(100),
  description: z.string().optional(),
  icon: z.string().max(50).optional(),
  is_active: z.boolean().optional()
});
export const updateEventTypeSchema = z.object({
  name: z.string().max(100).optional(),
  description: z.string().optional(),
  icon: z.string().max(50).optional(),
  is_active: z.boolean().optional()
}).partial();
