// db/experienciaUsuarioSchema.ts
import { pgTable, integer, varchar, text, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usersTable } from './usersSchema';

export const experienciaUsuarioTable = pgTable('experiencia_usuario', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  usuario_id: integer().references(() => usersTable.id),
  tipo: varchar({ length: 50 }),
  titulo: varchar({ length: 100 }),
  descripcion: text(),
  fecha_inicio: timestamp(),
  fecha_fin: timestamp(),
});

export const insertExperienciaUsuarioSchema = z.object({
  id: z.number().int(),
  usuario: z.number().int(),
  tipo: z.string().max(50),
  titulo: z.string().max(100),
  descripcion: z.string(),
  fecha_inicio: z.date(),
  fecha_fin: z.date(),
}).omit({
  id: true,
});

export const updateExperienciaUsuarioSchema = z.object({
  id: z.number().int(),
  usuario_id: z.number().int().optional(),
  tipo: z.string().max(50).optional(),
  titulo: z.string().max(100).optional(),
  descripcion: z.string().optional(),
  fecha_inicio: z.date().optional(),
  fecha_fin: z.date().optional(),
}).omit({
  id: true,
}).partial();
