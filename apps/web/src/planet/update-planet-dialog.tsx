/** biome-ignore-all lint/correctness/noChildrenProp: <explanation> */
import {
	type Planet,
	PlanetSchemas,
	type PlanetUpdateInput,
} from "@codelab/domain/planet";
import { useForm } from "@tanstack/react-form";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	InputGroupTextarea,
} from "@/components/ui/input-group";

interface Props {
	planet: Planet;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onAction: (update: PlanetUpdateInput) => void;
}

// In form name field is required, unlike in api where we don't have to send it if we don't want to updated it
const formSchema = PlanetSchemas.UpdateInputSchema.shape.data.extend({
	name: z.string().min(1),
});

export const UpdatePlanetDialog = ({
	onOpenChange,
	open,
	planet,
	onAction,
}: Props) => {
	const form = useForm({
		defaultValues: planet as PlanetUpdateInput["data"],
		validators: {
			onChange: formSchema,
			onSubmit: formSchema,
		},
		onSubmit: ({ value }) => onAction({ id: planet.id, data: value }),
	});

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<form
				id="update-planet-form"
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Edit Planet</DialogTitle>
						<DialogDescription>
							Make changes to{" "}
							<span className="font-semibold">{planet.name}</span>. Click save
							when you&apos;re done.
						</DialogDescription>
					</DialogHeader>
					<FieldGroup>
						<form.Field
							name="name"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>
											Name<span className="text-destructive">*</span>
										</FieldLabel>
										<Input
											id={field.name}
											name={field.name}
											value={field.state.value}
											onBlur={field.handleBlur}
											onChange={(e) => field.handleChange(e.target.value)}
											aria-invalid={isInvalid}
											required
											placeholder="Login button not working on mobile"
											autoComplete="off"
										/>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
						<form.Field
							name="description"
							children={(field) => {
								const isInvalid =
									field.state.meta.isTouched && !field.state.meta.isValid;
								return (
									<Field data-invalid={isInvalid}>
										<FieldLabel htmlFor={field.name}>Description</FieldLabel>
										<InputGroup>
											<InputGroupTextarea
												id={field.name}
												name={field.name}
												value={field.state.value || undefined}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="Describe the planet in a few words."
												rows={6}
												className="min-h-24 resize-none"
												aria-invalid={isInvalid}
											/>
											<InputGroupAddon align="block-end">
												<InputGroupText className="tabular-nums">
													{field.state.value?.length}/100 characters
												</InputGroupText>
											</InputGroupAddon>
										</InputGroup>
										<FieldDescription>
											Include how far is the planet from the sun.
										</FieldDescription>
										{isInvalid && (
											<FieldError errors={field.state.meta.errors} />
										)}
									</Field>
								);
							}}
						/>
					</FieldGroup>
					<DialogFooter>
						<DialogClose asChild>
							<Button variant="outline">Cancel</Button>
						</DialogClose>

						<form.Subscribe
							selector={(state) => [
								state.isDefaultValue,
								state.canSubmit,
								state.isSubmitting,
							]}
							children={([isDefaultValue, canSubmit, isSubmitting]) => (
								<Button
									type="submit"
									// The button is disabled if:
									// 1. the form's fields are the same as default values.
									// 2. The form is invalid (canSubmit is false)
									// 3. The form is currently submitting (isSubmitting is true)
									form="update-planet-form"
									disabled={isDefaultValue || !canSubmit || isSubmitting}
								>
									{isSubmitting ? "Saving..." : "Save Changes"}
								</Button>
							)}
						></form.Subscribe>
					</DialogFooter>
				</DialogContent>
			</form>
		</Dialog>
	);
};
