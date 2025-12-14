import type {
	Planet,
	PlanetCreateInput,
	PlanetCreateOutput,
	PlanetDeleteInput,
	PlanetDeleteOutput,
	PlanetUpdateInput,
	PlanetUpdateOutput,
} from "@codelab/domain/planet";
import {
	type DefaultError,
	useMutation,
	useQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { orpc } from "@/integrations/orpc/client";
import { columns } from "@/planet/columns";
import { CreatePlanetDialog } from "@/planet/create-planet-dialog";
import { DataTable } from "@/planet/data-table";
import { DeletePlanetDialog } from "@/planet/delete-planet-dialog";
import { UpdatePlanetDialog } from "@/planet/update-planet-dialog";

export const Route = createFileRoute("/")({
	component: App,
	loader: async ({ context }) => {
		await context.queryClient.prefetchQuery(
			orpc.planet.list.queryOptions({
				input: {},
			}),
		);
	},
});

function App() {
	const { data: planets, refetch } = useQuery(
		orpc.planet.list.queryOptions({ input: {}, initialData: [] }),
	);

	const { mutate: create } = useMutation<
		PlanetCreateOutput,
		DefaultError,
		PlanetCreateInput
	>({
		mutationFn: (input) => orpc.planet.create.call(input),
		onSuccess: (data) => {
			refetch();
			setOpenCreateDialog(false);
			toast.success(`Planet ${data?.name} has been created.`);
		},
	});

	const { mutate: update } = useMutation<
		PlanetUpdateOutput,
		DefaultError,
		PlanetUpdateInput
	>({
		mutationFn: (input) => orpc.planet.update.call(input),
		onSuccess: (data) => {
			refetch();
			setOpenUpdateDialog(false);
			toast.success(`Planet ${data?.name} has been updated.`);
		},
	});

	const { mutate: remove } = useMutation<
		PlanetDeleteOutput,
		DefaultError,
		PlanetDeleteInput
	>({
		mutationFn: ({ id }) => orpc.planet.delete.call({ id }),
		onSuccess: (data) => {
			refetch();
			setOpenDeleteDialog(false);
			toast.success(`Planet ${data?.name} has been deleted.`);
		},
	});

	const [selectedPlanet, setSelectedPlanet] = useState<Planet>();
	const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
	const [openUpdateDialog, setOpenUpdateDialog] = useState(false);
	const [openCreateDialog, setOpenCreateDialog] = useState(false);

	const onUpdate = useCallback((selected: Planet) => {
		setSelectedPlanet(selected);
		setOpenUpdateDialog(true);
	}, []);

	const onDelete = useCallback((selected: Planet) => {
		setSelectedPlanet(selected);
		setOpenDeleteDialog(true);
	}, []);

	return (
		<div className="overflow-hidden rounded-md border">
			<div className="container mx-auto py-10">
				<div className="flex justify-end m-2">
					<Button type="button" onClick={() => setOpenCreateDialog(true)}>
						<PlusIcon /> Create Planet
					</Button>
				</div>

				<DataTable
					columns={columns({
						onDelete,
						onUpdate,
					})}
					data={planets}
				/>
				<CreatePlanetDialog
					open={openCreateDialog}
					onOpenChange={setOpenCreateDialog}
					onAction={create}
				/>
				{selectedPlanet && (
					<>
						<DeletePlanetDialog
							planet={selectedPlanet}
							open={openDeleteDialog}
							onOpenChange={setOpenDeleteDialog}
							onAction={remove}
						/>
						<UpdatePlanetDialog
							planet={selectedPlanet}
							open={openUpdateDialog}
							onOpenChange={setOpenUpdateDialog}
							onAction={update}
						/>
					</>
				)}
			</div>
		</div>
	);
}
