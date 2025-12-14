import { PlanetSchemas } from "@codelab/domain/planet";
import { oc } from "@orpc/contract";

export const listPlanetContract = oc
	.route({
		method: "GET",
		path: "/planets",
	})
	.input(PlanetSchemas.ListInputSchema)
	.output(PlanetSchemas.ListOutputSchema);

export const findPlanetContract = oc
	.route({
		method: "GET",
		path: "/planets/:id",
	})
	.input(PlanetSchemas.FindInputSchema)
	.output(PlanetSchemas.FindOutputSchema);

export const createPlanetContract = oc
	.route({
		method: "POST",
		path: "/planets",
	})
	.input(PlanetSchemas.CreateInputSchema)
	.output(PlanetSchemas.CreateOutputSchema);

export const updatePlanetContract = oc
	.route({
		method: "PUT",
		path: "/planets",
	})
	.input(PlanetSchemas.UpdateInputSchema)
	.output(PlanetSchemas.UpdateOutputSchema);

export const deletePlanetContract = oc
	.route({
		method: "DELETE",
		path: "/planets",
	})
	.input(PlanetSchemas.DeleteInputSchema)
	.output(PlanetSchemas.DeleteOutputSchema);

export const planetContracts = {
	planet: {
		list: listPlanetContract,
		find: findPlanetContract,
		create: createPlanetContract,
		update: updatePlanetContract,
		delete: deletePlanetContract,
	},
};
