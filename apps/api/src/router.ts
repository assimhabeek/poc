import { planetContracts } from "@codelab/contract/planets";
import { planetFindQuery, planetListQuery } from "@codelab/database/planets";
import { implement } from "@orpc/server";

const os = implement(planetContracts);

const list = os.planet.list.handler(({ input: { offset, limit } }) =>
	planetListQuery.execute({ limit, offset }),
);

const find = os.planet.find.handler(({ input: { id } }) =>
	planetFindQuery.execute({ id }),
);

const create = os.planet.create.handler(({ input }) =>
	planetFindQuery.execute(input),
);

export const router = os.router({
	planet: { list, find, create },
});
