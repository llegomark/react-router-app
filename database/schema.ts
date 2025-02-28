import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

// Quiz schema
export const categories = sqliteTable("categories", {
  id: integer("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
});

export const questions = sqliteTable("questions", {
  id: integer("id").primaryKey(),
  categoryId: integer("category_id").notNull().references(() => categories.id),
  question: text("question").notNull(),
  options: text("options").notNull(), // JSON string of options array
  correctAnswer: integer("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  referenceTitle: text("reference_title").notNull(),
  referenceUrl: text("reference_url").notNull(),
  referenceCopyright: text("reference_copyright").notNull(),
});

// Contact submissions schema
export const contactSubmissions = sqliteTable("contact_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  mobileNumber: text("mobile_number"),
  message: text("message").notNull(),
  status: text("status").notNull().default('unread'),
  createdAt: text("created_at").notNull(),
});