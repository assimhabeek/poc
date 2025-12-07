import { defineConfig } from "drizzle-kit";

console.log("DATABASE_URL", process.env.DATABASE_URL);

export default defineConfig({
	out: "./drizzle",
	schema: ["./src/schema.ts"],
	dialect: "postgresql",
	dbCredentials: {
		// biome-ignore lint/style/noNonNullAssertion: will be replaced very soon
		url: process.env.DATABASE_URL!,
	},
});
