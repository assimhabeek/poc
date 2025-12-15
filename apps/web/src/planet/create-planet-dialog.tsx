/** biome-ignore-all lint/correctness/noChildrenProp: this is required by tanstack forms */
import { type PlanetCreateInput, PlanetSchemas } from "@codelab/domain/planet";
import { Button } from "@codelab/shadcn/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@codelab/shadcn/dialog";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "@codelab/shadcn/field";
import { Input } from "@codelab/shadcn/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupText,
	InputGroupTextarea,
} from "@codelab/shadcn/input-group";
import { useForm } from "@tanstack/react-form";

interface Props {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onAction: (create: PlanetCreateInput) => void;
}

const formSchema = PlanetSchemas.CreateInputSchema;

export const CreatePlanetDialog = ({ onOpenChange, open, onAction }: Props) => {
	const form = useForm({
		defaultValues: {
			name: "",
			description: "",
		} as PlanetCreateInput,
		validators: {
			onChange: formSchema,
			onSubmit: formSchema,
		},
		onSubmit: ({ value }) => onAction(value),
	});

	return (
		<Dialog open={open} onOpenChange={onOpenChange}>
			<form
				id="create-planet-form"
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<DialogContent className="sm:max-w-[425px]">
					<DialogHeader>
						<DialogTitle>Create Planet</DialogTitle>
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
									form="create-planet-form"
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
