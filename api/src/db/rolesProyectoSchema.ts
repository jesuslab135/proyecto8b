// db/rolesProyectoSchema.ts
import { pgTable, integer, varchar, boolean } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const rolesProyectoTable = pgTable('roles_proyecto', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar({ length: 50 }),
  puede_editar: boolean().default(false),
  puede_comentar: boolean().default(true),
  puede_subir_archivos: boolean().default(false),
  puede_validar: boolean().default(false),
});

export const insertRolProyectoSchema = z.object({
  id: z.number().int(),
  nombre: z.string().max(50),
  puede_editar: z.boolean().optional(),
  puede_comentar: z.boolean().optional(),
  puede_subir_archivos: z.boolean().optional(),
  puede_validar: z.boolean().optional(),
}).omit({
  id: true,
});

export const updateRolProyectoSchema = z.object({
  id: z.number().int(),
  nombre: z.string().max(50).optional(),
  puede_editar: z.boolean().optional(),
  puede_comentar: z.boolean().optional(),
  puede_subir_archivos: z.boolean().optional(),
  puede_validar: z.boolean().optional(),
}).omit({
  id: true,
});
