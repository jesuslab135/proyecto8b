// db/projectTechnologiesSchema.ts
import { pgTable, integer, varchar, timestamp, unique, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { proyectosTable } from './proyectosSchema';
import { z } from 'zod';

export const projectTechnologiesTable = pgTable('project_technologies', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  proyecto_id: integer().notNull().references(() => proyectosTable.id, { onDelete: 'cascade' }),
  technology_name: varchar({ length: 50 }).notNull(),   // Nombre de la tecnología:contentReference[oaicite:21]{index=21}
  proficiency_level: integer(),                         // Nivel de dominio 1-5:contentReference[oaicite:22]{index=22}
  created_at: timestamp().defaultNow()
}, (t) => [
  unique().on(t.proyecto_id, t.technology_name),        // UNIQUE(proyecto_id, technology_name):contentReference[oaicite:23]{index=23}
  check('project_technologies_proficiency_level_check', 
        sql`${t.proficiency_level} >= 1 AND ${t.proficiency_level} <= 5`)  // CHECK 1 <= proficiency_level <= 5:contentReference[oaicite:24]{index=24}
]);

export const insertProjectTechnologySchema = z.object({
  proyecto_id: z.number().int(),
  technology_name: z.string().max(50),
  proficiency_level: z.number().int().min(1).max(5)
});
export const updateProjectTechnologySchema = z.object({
  proyecto_id: z.number().int().optional(),
  technology_name: z.string().max(50).optional(),
  proficiency_level: z.number().int().min(1).max(5).optional()
}).partial();
