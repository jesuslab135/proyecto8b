import { integer, pgTable, varchar, text } from 'drizzle-orm/pg-core';
import { z } from 'zod';

export const usersTable = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),

  email: varchar({ length: 255 }).notNull().unique(),
  password: varchar({ length: 255 }).notNull(),
  role: varchar({ length: 255 }).notNull().default('user'),

  name: varchar({ length: 255 }),
  address: text(),
});

const emailRegex = /^[^@]+@[^@]+\.[^@]+$/;


export const createUserSchema = z.object({
  id: z.number(),
  email: z.string().regex(emailRegex, 'Invalid email').max(255),
  password: z.string().min(6).max(255),
  role: z.string().max(255).optional(), // default: 'user'
  name: z.string().max(255).optional(),
  address: z.string().optional(),
}).omit({
    id: true,
});

export const loginSchema = z.object({
  id: z.number(),
  email: z.string().regex(emailRegex, 'Invalid email').max(255),
  password: z.string().min(6).max(255),
  role: z.string().max(255).optional(), // default: 'user'
  name: z.string().max(255).optional(),
  address: z.string().optional(),
}).pick({
    email: true,
    password: true,
});
