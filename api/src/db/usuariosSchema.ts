// src/db/usuariosSchema.ts
import { pgTable, integer, varchar, boolean, text, timestamp } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { rolesUsuarioTable } from './rolesUsuarioSchema';
import { universidadesTable } from './universidadesSchema';

export const usuariosTable = pgTable('usuarios', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  nombre: varchar({ length: 100 }).notNull(),
  correo: varchar({ length: 150 }).notNull(),
  contrasena: text().notNull(),
  rol_id: integer().notNull().references(() => rolesUsuarioTable.id),
  universidad_id: integer().notNull().references(() => universidadesTable.id),
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
  nombre: z.string().max(100),
  correo: z.string().max(150),
  contrasena: z.string(),
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
});

export const updateUsuarioSchema = z.object({
  nombre: z.string().max(100),
  correo: z.string().max(150),
  contrasena: z.string(),
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
}).partial();

export const loginSchema = z.object({
  correo: z.string().max(150),
  contrasena: z.string().min(6).max(255),
});
