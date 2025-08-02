// db/ofertasLaboralesSchema.ts
import { pgTable, integer, varchar, timestamp, text, date } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { usuariosTable } from './usuariosSchema';

export const ofertasLaboralesTable = pgTable('ofertas_laborales', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  logo_url: text(),
  titulo: varchar({ length: 200 }),
  descripcion: text(),
  empresa: varchar({ length: 150 }),
  ubicacion: varchar({ length: 100 }),
  tipo_contrato: varchar({ length: 100 }),
  salario: varchar({ length: 100 }),
  fecha_publicacion: date(),
  fecha_limite: date(),
  creado_por: integer().references(() => usuariosTable.id),
  estado: varchar({ length: 50 }).default('activo'),
});

export const insertOfertasLaboralesSchema = z.object({
  logo_url: z.string(),
  titulo: z.string().max(200),
  descripcion: z.string(),
  empresa: z.string().max(150),
  ubicacion: z.string().max(100),
  tipo_contrato: z.string().max(100),
  salario: z.string().max(100),
  fecha_publicacion: z.date().optional(),
  fecha_limite: z.date().optional(),
  creado_por: z.number().int(),
  estado: z.string().max(50).default('activo'),
});

export const updateOfertasLaboralesSchema = z.object({
  logo_url: z.string().optional(),
  titulo: z.string().max(200).optional(),
  descripcion: z.string().optional(),
  empresa: z.string().max(150).optional(),
  ubicacion: z.string().max(100).optional(),
  tipo_contrato: z.string().max(100).optional(),
  salario: z.string().max(100).optional(),
  fecha_publicacion: z.date(),
  fecha_limite: z.date().optional(),
  creado_por: z.number().int(),
  estado: z.string().max(50).optional()
}).partial();