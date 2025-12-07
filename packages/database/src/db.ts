import { drizzle } from "drizzle-orm/node-postgres";
import { planetTable } from "./schema";

// biome-ignore lint/style/noNonNullAssertion: will be replaced very soon
export const db = drizzle(process.env.DATABASE_URL!, {
	schema: { planets: planetTable },
});
