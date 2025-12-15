import { planets } from "@codelab/database/schema";
import * as drizzleZod from "drizzle-zod";
import z from "zod";

const { createInsertSchema, createSelectSchema, createUpdateSchema } =
	drizzleZod.createSchemaFactory({ coerce: {} });

const PlanetSchema = createSelectSchema(planets);

const ListInputSchema = z.object({
	limit: z.coerce.number().int().min(1).max(100).optional().default(10),
	offset: z.coerce.number().int().min(0).default(0),
});
const FindInputSchema = PlanetSchema.pick({ id: true });
const CreateInputSchema = createInsertSchema(planets);
const UpdateInputSchema = z.object({
	id: z.number().min(0).max(100),
	data: createUpdateSchema(planets),
});
const DeleteInputSchema = z.object({ id: z.number().min(0).max(100) });

const ListOutputSchema = z.array(PlanetSchema);
const FindOutputSchema = z.optional(PlanetSchema);
const CreateOutputSchema = z.optional(PlanetSchema);
const UpdateOutputSchema = z.optional(PlanetSchema);
const DeleteOutputSchema = z.optional(PlanetSchema);

export const PlanetSchemas = {
	PlanetSchema,
	FindInputSchema,
	ListInputSchema,
	CreateInputSchema,
	UpdateInputSchema,
	DeleteInputSchema,
	ListOutputSchema,
	FindOutputSchema,
	CreateOutputSchema,
	UpdateOutputSchema,
	DeleteOutputSchema,
};

export type Planet = z.infer<typeof PlanetSchema>;

export type PlanetCreateInput = z.infer<typeof CreateInputSchema>;
export type PlanetCreateOutput = z.infer<typeof CreateOutputSchema>;

export type PlanetUpdateInput = z.infer<typeof UpdateInputSchema>;
export type PlanetUpdateOutput = z.infer<typeof UpdateOutputSchema>;

export type PlanetDeleteInput = z.infer<typeof DeleteInputSchema>;
export type PlanetDeleteOutput = z.infer<typeof DeleteOutputSchema>;
