// db/rolesUsuarioSchema.ts
import { pgTable, integer, varchar } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const rolesUsuarioTable = pgTable('roles_usuario', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar({ length: 50 }),
});

export const insertRolUsuarioSchema = z.object({
  nombre: z.string().max(50),
});

export const updateRolUsuarioSchema = z.object({
  nombre: z.string().max(50).optional(),
}).partial();

