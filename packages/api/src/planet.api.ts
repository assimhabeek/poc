import { planetContracts } from "@codelab/contract/planet";
import type { Database } from "@codelab/database/db";
import { planets } from "@codelab/database/schema";
import { implement } from "@orpc/server";
import { eq } from "drizzle-orm";

const os = implement(planetContracts);

export const planetApi = (db: Database) => ({
	planet: {
		list: os.planet.list.handler(({ input: { offset, limit } }) =>
			db.query.planets.findMany({ limit, offset }),
		),

		find: os.planet.find.handler(({ input: { id } }) =>
			db.query.planets.findFirst({ where: { id } }),
		),
		create: os.planet.create.handler(({ input }) =>
			db
				.insert(planets)
				.values(input)
				.returning()
				.then((rows) => rows[0]),
		),
		update: os.planet.update.handler(({ input }) =>
			db
				.update(planets)
				.set(input.data)
				.where(eq(planets.id, input.id))
				.returning()
				.then((rows) => rows[0]),
		),
		delete: os.planet.delete.handler(({ input }) =>
			db
				.delete(planets)
				.where(eq(planets.id, input.id))
				.returning()
				.then((rows) => rows[0]),
		),
	},
});
