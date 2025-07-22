// db/proyectosValidacionesSchema.ts
import { pgTable, integer, varchar, text, timestamp} from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usersTable } from './usersSchema';
import { proyectosTable } from './proyectosSchema';

export const proyectosValidacionesTable = pgTable('proyectos_validaciones', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  proyecto_id: integer().references(() => proyectosTable.id),
  admin_id: integer().references(() => usersTable.id),
  comentarios: text(),
  estado: varchar({ length: 50 }).default('pendiente'),
  fecha_validacion: timestamp().defaultNow(),
});

export const insertProyectosValidacionesSchema = z.object({
  id: z.number().int(),
  proyecto_id: z.number().int(),
  admin_id: z.number().int(),
  comentarios: z.string().max(1000),
  estado: z.string().max(50),
  fecha_validacion: z.date(),
}).omit({
  id: true,
});

export const updateProyectosValidacionesSchema = z.object({
  id: z.number().int(),
  proyecto_id: z.number().int().optional(),
  admin_id: z.number().int().optional(),
  comentarios: z.string().max(1000).optional(),
  estado: z.string().max(50).optional(),
  fecha_validacion: z.date().optional(),
}).omit({
  id: true,
}).partial();
