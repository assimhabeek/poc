import { planetContracts } from "@codelab/contract/planets";
import { Controller, Logger } from "@nestjs/common";
import { Implement, implement, populateContractRouterPaths } from "@orpc/nest";

const planets = [
	{
		id: 1,
		name: "Earth",
		description: "The planet Earth",
	},
	{
		id: 2,
		name: "Mars",
		description: "The planet Mars",
	},
	{
		id: 3,
		name: "Venus",
		description: "The planet Venus",
	},
	{
		id: 4,
		name: "Jupiter",
		description: "The planet Jupiter",
	},
];

const contract = populateContractRouterPaths(planetContracts);
@Controller()
export class AppController {
	@Implement(contract.planet.list)
	list() {
		return implement(contract.planet.list).handler(() => planets);
	}

	@Implement(contract.planet.find)
	find() {
		return implement(contract.planet.find).handler(({ input: { id } }) =>
			planets.find((planet) => {
				Logger.log("Finding planet with id:", planet.id, id);
				return planet.id === id;
			}),
		);
	}

	@Implement(contract.planet.create)
	create() {
		return implement(contract.planet.create).handler(
			({ input: { name, description } }) => ({
				id: planets.length + 1,
				name,
				description,
			}),
		);
	}
}
