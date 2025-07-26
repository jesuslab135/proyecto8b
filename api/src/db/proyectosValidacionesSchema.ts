// db/proyectosValidacionesSchema.ts
import { pgTable, integer, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usuariosTable } from './usuariosSchema';
import { proyectosTable } from './proyectosSchema';

export const proyectosValidacionesTable = pgTable('proyectos_validaciones', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  proyecto_id: integer().references(() => proyectosTable.id),
  admin_id: integer().references(() => usuariosTable.id),
  comentarios: text(),
  estado: varchar({ length: 50 }),
  fecha_validacion: timestamp().defaultNow(),
});

export const insertProyectoValidacionSchema = z.object({
  proyecto_id: z.number().int(),
  admin_id: z.number().int(),
  comentarios: z.string().optional(),
  estado: z.string().max(50),
  fecha_validacion: z.string().optional(), // ISO format
});

export const updateProyectoValidacionSchema = z.object({
  proyecto_id: z.number().int().optional(),
  admin_id: z.number().int().optional(),
  comentarios: z.string().optional(),
  estado: z.string().max(50).optional(),
  fecha_validacion: z.string().optional(),
}).partial();
