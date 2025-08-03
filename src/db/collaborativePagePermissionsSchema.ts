// db/collaborativePagePermissionsSchema.ts
import { pgTable, integer, timestamp, boolean, unique } from 'drizzle-orm/pg-core';
import { usuariosTable } from './usuariosSchema';
import { paginasColaborativasTable } from './paginasColaborativasSchema';
import { permissionTypesTable } from './permissionTypesSchema';
import { z } from 'zod';

export const collaborativePagePermissionsTable = pgTable('collaborative_page_permissions', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  page_id: integer().notNull().references(() => paginasColaborativasTable.id, { onDelete: 'cascade' }),
  user_id: integer().notNull().references(() => usuariosTable.id, { onDelete: 'cascade' }),
  permission_type_id: integer().notNull().references(() => permissionTypesTable.id),
  granted_by: integer().references(() => usuariosTable.id),  // Quién otorgó el permiso:contentReference[oaicite:30]{index=30}
  granted_at: timestamp().defaultNow(),                      // Cuándo se otorgó:contentReference[oaicite:31]{index=31}
  is_active: boolean().default(true)                         // Estado del permiso:contentReference[oaicite:32]{index=32}
}, (t) => [
  unique().on(t.page_id, t.user_id, t.permission_type_id)    // UNIQUE(page_id, user_id, permission_type_id):contentReference[oaicite:33]{index=33}
]);

export const insertCollaborativePagePermissionSchema = z.object({
  page_id: z.number().int(),
  user_id: z.number().int(),
  permission_type_id: z.number().int(),
  // `granted_by` and `granted_at` are set automatically (e.g. by the system), not provided by client
  is_active: z.boolean().optional()
});
export const updateCollaborativePagePermissionSchema = z.object({
  page_id: z.number().int().optional(),
  user_id: z.number().int().optional(),
  permission_type_id: z.number().int().optional(),
  is_active: z.boolean().optional()
}).partial();
