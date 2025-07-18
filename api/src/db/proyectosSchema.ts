// db/ProyectosSchema.ts
import { pgTable, integer, varchar, text, timestamp, boolean} from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usersTable } from './usersSchema';
import { universidadesTable } from './universidadesSchema';

export const proyectosTable = pgTable('proyectos', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar({ length: 200 }),
  descripcion: text(),
  creador_id: integer().references(() => usersTable.id),
  universidad_id: integer().references(() => universidadesTable.id),
  estado_verificacion: varchar({ length: 50 }),
  vista_publica: boolean().default(true),
  creado_en: timestamp().defaultNow(),
});

export const insertProyectosSchema = z.object({
  id: z.number().int(),
  nombre: z.string().max(200),
  descripcion: z.string(),
  creador_id: z.number().int(),
  universidad_id: z.number().int(),
  estado_verificacion: z.string().max(50),
  vista_publica: z.boolean().default(true),
  creado_en: z.date().optional(),
}).omit({
  id: true,
});

export const updateProyectosSchema = z.object({
  id: z.number().int(),
  nombre: z.string().max(200).optional(),
  descripcion: z.string().optional(),
  creador_id: z.number().int().optional(),
  universidad_id: z.number().int().optional(),
  estado_verificacion: z.string().max(50).optional(),
  vista_publica: z.boolean().default(true).optional(),
  creado_en: z.date().optional(),
}).omit({
  id: true,
}).partial();
