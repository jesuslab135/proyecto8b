// db/validationDocumentsSchema.ts
import { pgTable, integer, varchar, text, boolean, timestamp } from 'drizzle-orm/pg-core';
import { proyectosValidacionesTable } from './proyectosValidacionesSchema';
import { z } from 'zod';

export const validationDocumentsTable = pgTable('validation_documents', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  validation_id: integer().notNull().references(() => proyectosValidacionesTable.id, { onDelete: 'cascade' }),
  document_name: varchar({ length: 100 }).notNull(),  // Nombre del documento requerido:contentReference[oaicite:38]{index=38}
  document_url: text(),                               // URL del documento subido:contentReference[oaicite:39]{index=39}
  is_submitted: boolean().default(false),             // Si ya fue enviado (entregado):contentReference[oaicite:40]{index=40}
  created_at: timestamp().defaultNow()
});

export const insertValidationDocumentSchema = z.object({
  validation_id: z.number().int(),
  document_name: z.string().max(100),
  document_url: z.string().optional(),
  is_submitted: z.boolean().optional()
});
export const updateValidationDocumentSchema = z.object({
  validation_id: z.number().int().optional(),
  document_name: z.string().max(100).optional(),
  document_url: z.string().optional(),
  is_submitted: z.boolean().optional()
}).partial();
