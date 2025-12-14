import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "./schema";

export type Database = ReturnType<typeof getDB>;

export const getDB = (connectionString: string) =>
	drizzle({
		relations,
		logger: true,
		connection: {
			connectionString,
		},
	});
