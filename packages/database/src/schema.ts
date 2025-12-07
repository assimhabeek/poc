import { pgTable } from "drizzle-orm/pg-core";

export const planetTable = pgTable("planets", (t) => ({
	id: t.integer().generatedAlwaysAsIdentity().primaryKey(),
	name: t.text().notNull(),
	description: t.text(),
}));
