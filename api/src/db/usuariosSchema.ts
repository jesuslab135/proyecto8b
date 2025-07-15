// src/db/usuariosSchema.ts
import { pgTable, integer, varchar, boolean, text, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { rolesUsuarioTable } from './rolesUsuarioSchema';
import { universidadesTable } from './universidadesSchema';

export const usuariosTable = pgTable('usuarios', {
  id: integer().primaryKey().notNull(),
  nombre: varchar({ length: 100 }),
  correo: varchar({ length: 150 }),
  contraseña_hash: text(),
  rol_id: integer().references(() => rolesUsuarioTable.id),
  universidad_id: integer().references(() => universidadesTable.id),
  matricula: varchar({ length: 50 }),
  telefono: varchar({ length: 20 }),
  verificado: boolean().default(false),
  debe_cambiar_contraseña: boolean().default(true),
  github_url: text(),
  linkedin_url: text(),
  biografia: text(),
  cv_url: text(),
  cv_publico: boolean().default(false),
  creado_en: timestamp().defaultNow(),
});

export const insertUsuarioSchema = z.object({
  id: z.number(),
  nombre: z.string().max(100),
  correo: z.string().email().max(150),
  contraseña_hash: z.string(),
  rol_id: z.number().int(),
  universidad_id: z.number().int(),
  matricula: z.string().max(50),
  telefono: z.string().max(20),
  verificado: z.boolean().optional(),
  debe_cambiar_contraseña: z.boolean().optional(),
  github_url: z.string().optional(),
  linkedin_url: z.string().optional(),
  biografia: z.string().optional(),
  cv_url: z.string().optional(),
  cv_publico: z.boolean().optional(),
  creado_en: z.date().optional()
}).omit({
    id: true,
    contraseña_hash: true,
});

export const updateUsuarioSchema = z.object({
  id: z.number(),
  nombre: z.string().max(100),
  correo: z.string().email().max(150),
  contraseña_hash: z.string(),
  rol_id: z.number().int(),
  universidad_id: z.number().int(),
  matricula: z.string().max(50),
  telefono: z.string().max(20),
  verificado: z.boolean().optional(),
  debe_cambiar_contraseña: z.boolean().optional(),
  github_url: z.string().optional(),
  linkedin_url: z.string().optional(),
  biografia: z.string().optional(),
  cv_url: z.string().optional(),
  cv_publico: z.boolean().optional(),
  creado_en: z.date().optional()
}).omit({
    id: true,
    contraseña_hash: true,
}).partial();

