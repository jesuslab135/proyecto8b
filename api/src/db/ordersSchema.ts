import {
  doublePrecision,
  integer,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { usersTable } from './usersSchema.js';
import { productsTable } from './productsSchema.js';
import { z } from 'zod';

export const ordersTable = pgTable('orders', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  createdAt: timestamp().notNull().defaultNow(),
  status: varchar({ length: 50 }).notNull().default('New'),

  userId: integer()
    .references(() => usersTable.id)
    .notNull(),

  stripePaymentIntentId: varchar({ length: 255 }),
});

export const orderItemsTable = pgTable('order_items', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  orderId: integer()
    .references(() => ordersTable.id)
    .notNull(),
  productId: integer()
    .references(() => productsTable.id)
    .notNull(),

  quantity: integer().notNull(),
  price: doublePrecision().notNull(),
});

export const insertOrderSchema = z.object({
    id: z.number().int(),
    createdAt: z.date(),
    status: z.string().max(50),
    userId: z.number().int(),
    stripePaymentIntentId: z.string().max(255).nullable().optional(),
}).omit({
  id: true,
  userId: true,
  status: true,
  createdAt: true,
});

export const updateOrderSchema = z.object({
    id: z.number().int(),
    createdAt: z.date(),
    status: z.string().max(50),
    userId: z.number().int(),
    stripePaymentIntentId: z.string().max(255).nullable().optional(),
}).pick({
  status: true,
});

export const insertOrderItemSchema = z.object({
    id: z.number().int(),
    orderId: z.number().int(),
    productId: z.number().int(),
    quantity: z.number().int(),
    price: z.number(),
}).omit({
  id: true,
  orderId: true,
});

export const insertOrderWithItemsSchema = z.object({
    order: insertOrderSchema,
    items: z.array(insertOrderItemSchema),
});
