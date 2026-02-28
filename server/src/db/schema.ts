import { pgTable, integer, varchar, date, pgEnum } from "drizzle-orm/pg-core";

//Enums
const typeEnum = pgEnum("type", ["residential", "commercial", "industrial"]);
const statusEnum = pgEnum("status", ["healthy", "maintenance", "alert"]);

export const usersTable = pgTable("users",{
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    firstname: varchar({length: 100}).notNull(),
    lastname: varchar({length: 100}).notNull(),
    email: varchar({length: 255}).unique().notNull(),
    password: varchar({length: 255}).notNull(),
    created_at: date("created_at").defaultNow(),
    updated_at: date("updated_at").defaultNow().notNull(),
});

export const buildings = pgTable("buildings" ,{
    id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
    user_id: integer("user_id").notNull().references(() => usersTable.id, {onDelete: "cascade", onUpdate: "no action"}),
    name: varchar({length: 255}).unique().notNull(),
    address: varchar({length: 255}).notNull(),
    type: typeEnum("type").default("residential").notNull(),
    total_units: integer("total_units").notNull(),
    status: statusEnum("status").default("healthy").notNull(),
    image_url:varchar({length: 255}).notNull(),
    created_at: date("created_at").defaultNow(),
    updated_at: date("updated_at").defaultNow().notNull(),
})