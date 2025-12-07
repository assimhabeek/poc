import { PlanetZodSchema } from "@codelab/domain/planet";
import { oc } from "@orpc/contract";
import * as z from "zod";

const { InsertSchema, SelectSchema } = PlanetZodSchema;

export const listPlanetContract = oc
	.route({
		method: "GET",
		path: "/planets", // Path is required for NestJS implementation
	})
	.input(
		z.object({
			limit: z.coerce.number().int().min(1).max(100).optional().default(10),
			offset: z.coerce.number().int().min(0).default(10),
		}),
	)
	.output(z.array(SelectSchema));

export const findPlanetContract = oc
	.route({
		method: "GET",
		path: "/planets/:id",
	})
	.input(SelectSchema.pick({ id: true }))
	.output(z.optional(SelectSchema));

export const createPlanetContract = oc
	.route({
		method: "POST",
		path: "/planets", // Path is required
	})
	.input(InsertSchema)
	.output(z.optional(SelectSchema));

/**
 * populateContractRouterPaths is completely optional,
 * because the procedure's path is required for NestJS implementation.
 * This utility automatically populates any missing paths
 * Using the router's keys + `/`.
 */
export const planetContracts = {
	planet: {
		list: listPlanetContract,
		find: findPlanetContract,
		create: createPlanetContract,
	},
};
