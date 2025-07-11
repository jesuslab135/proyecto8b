import {
  integer,
  pgTable,
  varchar,
  text,
  doublePrecision,
} from 'drizzle-orm/pg-core';

export const productsTable = pgTable('products', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  description: text(),
  image: varchar({ length: 255 }),
  price: doublePrecision().notNull(),
});

import { z } from 'zod';

export const createProductSchema = z.object({
  id: z.number(),
  name: z.string().min(1).max(255),
  description: z.string().optional(),
  image: z.string().max(255).optional(),
  price: z.number({ message: "Price should be a number" }).positive(),
}).omit({id:true});

export const updateProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  price: z.number({ message: "Price should be a number" }),
}).omit({id:true}).partial();
