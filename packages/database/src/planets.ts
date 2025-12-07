import { eq, sql } from "drizzle-orm";
import { db } from "./db";
import { planetTable } from "./schema";

export const planetListQuery = db.query.planets
	.findMany({
		limit: sql.placeholder("limit"),
		offset: sql.placeholder("offset"),
	})
	.prepare("lQuery");

export const planetFindQuery = db.query.planets
	.findFirst({
		where: eq(planetTable.id, sql.placeholder("id")),
	})
	.prepare("Planet Find Query");

export const planetCreateQuery = db
	.insert(planetTable)
	.values({
		name: sql.placeholder("name"),
		description: sql.placeholder("description"),
	})
	.prepare("Planet Create Query");
