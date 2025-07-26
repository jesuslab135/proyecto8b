// db/permissionTypesSchema.ts
import { pgTable, integer, varchar, text, timestamp, unique } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const permissionTypesTable = pgTable('permission_types', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  code: varchar({ length: 50 }).notNull().unique(),  // Código para uso programático (único):contentReference[oaicite:16]{index=16}
  name: varchar({ length: 100 }).notNull(),          // Nombre legible del permiso:contentReference[oaicite:17]{index=17}
  description: text(),                               // Descripción del tipo de permiso
  created_at: timestamp().defaultNow()
});

export const insertPermissionTypeSchema = z.object({
  code: z.string().max(50),
  name: z.string().max(100),
  description: z.string().optional()
});
export const updatePermissionTypeSchema = z.object({
  code: z.string().max(50).optional(),
  name: z.string().max(100).optional(),
  description: z.string().optional()
}).partial();
