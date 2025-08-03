// db/userSkillsSchema.ts
import { pgTable, integer, varchar, timestamp, unique, check } from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm';
import { usuariosTable } from './usuariosSchema';
import { z } from 'zod';

export const userSkillsTable = pgTable('user_skills', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  usuario_id: integer().notNull().references(() => usuariosTable.id, { onDelete: 'cascade' }),
  skill_name: varchar({ length: 100 }).notNull(),    // Nombre de la habilidad:contentReference[oaicite:26]{index=26}
  proficiency_level: integer(),                     // Nivel de dominio 1-5:contentReference[oaicite:27]{index=27}
  created_at: timestamp().defaultNow()
}, (t) => [
  unique().on(t.usuario_id, t.skill_name),          // UNIQUE(usuario_id, skill_name):contentReference[oaicite:28]{index=28}
  check('user_skills_proficiency_level_check', 
        sql`${t.proficiency_level} >= 1 AND ${t.proficiency_level} <= 5`)
]);

export const insertUserSkillSchema = z.object({
  usuario_id: z.number().int(),
  skill_name: z.string().max(100),
  proficiency_level: z.number().int().min(1).max(5)
});
export const updateUserSkillSchema = z.object({
  usuario_id: z.number().int().optional(),
  skill_name: z.string().max(100).optional(),
  proficiency_level: z.number().int().min(1).max(5).optional()
}).partial();
