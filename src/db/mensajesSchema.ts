// db/mensajesSchema.ts
import { pgTable, integer, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { conversacionesTable } from './conversacionesSchema';
import { usuariosTable } from './usuariosSchema';

export const mensajesTable = pgTable('mensajes', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  conversacion_id: integer().references(() => conversacionesTable.id),
  emisor_id: integer().references(() => usuariosTable.id),
  contenido: text(),
  enviado_en: timestamp().defaultNow(),
  leido: boolean().default(false),
});

export const insertMensajeSchema = z.object({
  conversacion_id: z.number().int(),
  emisor_id: z.number().int(),
  contenido: z.string().min(1),
  enviado_en: z.date().optional(),
  leido: z.boolean().optional(),
});

export const updateMensajeSchema = z.object({
  contenido: z.string().min(1).optional(),
  leido: z.boolean().optional(),
}).partial();
