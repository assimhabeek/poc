import { planetTable } from "@codelab/database/schema";
import {
	createInsertSchema,
	createSelectSchema,
	createUpdateSchema,
} from "drizzle-zod";
import type z from "zod";

const SelectSchema = createSelectSchema(planetTable);
const InsertSchema = createInsertSchema(planetTable);
const UpdateSchema = createUpdateSchema(planetTable);

export const PlanetZodSchema = { SelectSchema, InsertSchema, UpdateSchema };

export type Planet = z.infer<typeof SelectSchema>;
export type PlanetInsertInput = z.infer<typeof InsertSchema>;
export type PlanetUpdateInput = z.infer<typeof UpdateSchema>;
