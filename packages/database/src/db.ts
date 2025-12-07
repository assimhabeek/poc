import { drizzle } from "drizzle-orm/node-postgres";
import { planetTable } from "./schema";

export const db = drizzle(process.env.DATABASE_URL!, {
	schema: { planets: planetTable },
});
