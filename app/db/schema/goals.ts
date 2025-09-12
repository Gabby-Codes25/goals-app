import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";
import { title } from "process";

export const goals = pgTable('goals', {
  id: serial('id').primaryKey(),
  userId: varchar('user_id', { length: 256 }).notNull(),
  title: varchar('title', { length: 256 }).notNull(),
  description: text('description'),
  created_at: timestamp('created_at').defaultNow().notNull(),
  updated_at: timestamp('updated_at').defaultNow().notNull(),
});