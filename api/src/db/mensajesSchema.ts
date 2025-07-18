// db/mensajesSchema.ts
import { pgTable, integer, text, timestamp, boolean } from 'drizzle-orm/pg-core';
import { z } from 'zod';
import { conversacionesTable } from './conversacionesSchema';
import { usersTable } from './usersSchema';

export const mensajesTable = pgTable('mensajes', {
  id: integer('id').primaryKey().generatedAlwaysAsIdentity(),
  conversacion_id: integer('conversacion_id').references(() => conversacionesTable.id),
  emisor_id: integer('emisor_id').references(() => usersTable.id),
  contenido: text('contenido'),
  enviado_en: timestamp('enviado_en').defaultNow(),
  leido: boolean('leido').default(false),
});

export const insertMensajeSchema = z.object({
  id: z.number().int(),
  conversacion_id: z.number().int(),
  emisor_id: z.number().int(),
  contenido: z.string().min(1),
  enviado_en: z.date().optional(),
  leido: z.boolean().optional(),
}).omit({
  id: true,
});

export const updateMensajeSchema = z.object({
  id: z.number().int(),
  contenido: z.string().min(1).optional(),
  leido: z.boolean().optional(),
}).omit({
  id: true,
}).partial();
