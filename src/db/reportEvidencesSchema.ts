// db/reportEvidencesSchema.ts
import { pgTable, integer, text, varchar, timestamp } from 'drizzle-orm/pg-core';
import { reportesTable } from './reportesSchema';
import { z } from 'zod';

export const reportEvidencesTable = pgTable('report_evidences', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  reporte_id: integer().notNull().references(() => reportesTable.id, { onDelete: 'cascade' }),
  evidence_url: text().notNull(),                  // URL de la evidencia:contentReference[oaicite:35]{index=35}
  evidence_type: varchar({ length: 50 }),          // Tipo de evidencia (imagen, video, documento):contentReference[oaicite:36]{index=36}
  created_at: timestamp().defaultNow()
});

export const insertReportEvidenceSchema = z.object({
  reporte_id: z.number().int(),
  evidence_url: z.string(),         // could use z.string().url() if URL validation needed
  evidence_type: z.string().max(50).optional()
});
export const updateReportEvidenceSchema = z.object({
  reporte_id: z.number().int().optional(),
  evidence_url: z.string().optional(),
  evidence_type: z.string().max(50).optional()
});
