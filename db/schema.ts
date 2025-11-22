import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users_table", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  email: text("email").notNull().unique(),
});

export const promptTable = pgTable("prompt", {
  id: serial("id").primaryKey(),
  input: text("input").notNull().default(""),
  output: text("output").notNull().default(""),
  inputTokens: integer("input_tokens").notNull().default(0),
  outputTokens: integer("output_tokens").notNull().default(0),
});
