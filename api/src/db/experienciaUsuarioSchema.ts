// db/experienciaUsuarioSchema.ts
import { pgTable, integer, varchar, text, date } from 'drizzle-orm/pg-core';
import { usersTable } from './usersSchema';
import { z } from 'zod';

export const experienciaUsuarioTable = pgTable('experiencia_usuario', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  usuario_id: integer().references(() => usersTable.id),
  tipo: varchar({ length: 50 }),
  titulo: varchar({ length: 100 }),
  descripcion: text(),
  fecha_inicio: date(),
  fecha_fin: date(),
});

export const insertExperienciaUsuarioSchema = z.object({
  usuario_id: z.number().int(),
  tipo: z.string().max(50),
  titulo: z.string().max(100),
  descripcion: z.string(),
  fecha_inicio: z.string().refine(val => !isNaN(Date.parse(val)), {
  message: 'fecha_inicio debe ser una fecha válida'
}).transform(val => new Date(val)),
fecha_fin: z.string().refine(val => !isNaN(Date.parse(val)), {
  message: 'fecha_fin debe ser una fecha válida'
}).transform(val => new Date(val)),
});

export const updateExperienciaUsuarioSchema = z.object({
  usuario_id: z.number().int(),
  tipo: z.string().max(50),
  titulo: z.string().max(100),
  descripcion: z.string(),
  fecha_inicio: z.string().refine(val => !isNaN(Date.parse(val)), {
  message: 'fecha_inicio debe ser una fecha válida'
}).transform(val => new Date(val)),
fecha_fin: z.string().refine(val => !isNaN(Date.parse(val)), {
  message: 'fecha_fin debe ser una fecha válida'
}).transform(val => new Date(val)),
});