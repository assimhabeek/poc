import { defineRelations } from "drizzle-orm";
import * as p from "drizzle-orm/pg-core";

export const planets = p.pgTable("planets", {
	id: p.integer().generatedAlwaysAsIdentity().primaryKey(),
	name: p.text().notNull(),
	description: p.text(),
});

export const relations = defineRelations({ planets }, () => ({}));
