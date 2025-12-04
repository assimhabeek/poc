import { type Planet, planetContracts } from "@codelab/contract/planets";
import { implement } from "@orpc/server";

const os = implement(planetContracts);

const planets: Array<Planet> = [
	{ id: 1, name: "Earth", description: "The third planet from the sun" },
	{ id: 2, name: "Mars", description: "The red planet" },
	{ id: 3, name: "Venus", description: "The planet of love" },
	{ id: 4, name: "Jupiter", description: "The gas giant" },
	{ id: 5, name: "Saturn", description: "The ringed planet" },
];

const list = os.planet.list.handler(({ input: { cursor, limit } }) =>
	planets.slice(cursor, cursor + (limit ?? planets.length)),
);

const find = os.planet.find.handler(({ input: { id } }) =>
	planets.find((planet) => planet.id === id),
);

const create = os.planet.create.handler(({ input: { name, description } }) => {
	const newPlanet = {
		id: planets.length + 1,
		name,
		description,
	};
	planets.push(newPlanet);

	return newPlanet;
});

export const router = os.router({
	planet: { list, find, create },
});
