// db/systemStatesSchema.ts
import { pgTable, integer, varchar, text, boolean, timestamp, unique } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const systemStatesTable = pgTable('system_states', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  entity_type: varchar({ length: 50 }).notNull(),    // Tipo de entidad: 'proyecto', 'postulacion', etc.:contentReference[oaicite:0]{index=0}
  code: varchar({ length: 50 }).notNull(),           // Código único del estado:contentReference[oaicite:1]{index=1}
  name: varchar({ length: 100 }).notNull(),          // Nombre legible del estado:contentReference[oaicite:2]{index=2}
  description: text(),                               // Descripción detallada:contentReference[oaicite:3]{index=3}
  color: varchar({ length: 7 }),                     // Color hex para UI:contentReference[oaicite:4]{index=4}
  is_active: boolean().default(true),                // Gestión de estado (activo/inactivo):contentReference[oaicite:5]{index=5}
  sort_order: integer().default(0),                  // Orden de visualización:contentReference[oaicite:6]{index=6}
  created_at: timestamp().defaultNow()
}, (t) => [
  // Unique constraint to avoid duplicate code per entity type:
  unique().on(t.entity_type, t.code)                 // UNIQUE(entity_type, code):contentReference[oaicite:7]{index=7}
]);

export const insertSystemStateSchema = z.object({
  entity_type: z.string().max(50),
  code: z.string().max(50),
  name: z.string().max(100),
  description: z.string().optional(),
  color: z.string().max(7).optional(),
  is_active: z.boolean().optional(),
  sort_order: z.number().int().optional()
});
export const updateSystemStateSchema = z.object({
  entity_type: z.string().max(50).optional(),
  code: z.string().max(50).optional(),
  name: z.string().max(100).optional(),
  description: z.string().optional(),
  color: z.string().max(7).optional(),
  is_active: z.boolean().optional(),
  sort_order: z.number().int().optional()
}).partial();
