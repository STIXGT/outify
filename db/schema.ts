import { pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";

export const users = pgTable("users", {
  id: text("clerk_user_id").primaryKey(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  name: varchar("name", { length: 255 }),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  updatedAt: timestamp("updated_at", { mode: "date" }).defaultNow().notNull(),
});

export const outings = pgTable("outings", {
  id: uuid("id").defaultRandom().primaryKey(),
  title: varchar("title", { length: 255 }).notNull(),
  description: text("description"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
  userId: text("user_id")
    .references(() => users.id)
    .notNull(),
});

// Relaciones
export const usersRelations = relations(users, ({ many }) => ({
  outings: many(outings),
}));

export const outingsRelations = relations(outings, ({ one }) => ({
  user: one(users, {
    fields: [outings.userId],
    references: [users.id],
  }),
}));
