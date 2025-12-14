import type {
	Planet,
	PlanetUpdateInput,
	PlanetUpdateOutput,
} from "@codelab/domain/planet";
import {
	type DefaultError,
	useMutation,
	useQuery,
} from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { orpc } from "@/integrations/orpc/client";

export const Route = createFileRoute("/demo/orpc-planet")({
	component: ORPCPlanets,
	loader: async ({ context }) => {
		await context.queryClient.prefetchQuery(
			orpc.planet.list.queryOptions({
				input: {},
			}),
		);
	},
});

function ORPCPlanets() {
	const { data, refetch } = useQuery(
		orpc.planet.list.queryOptions({
			input: {},
		}),
	);

	const [planet, setPlanet] = useState("");
	const { mutate: addPlanet } = useMutation<
		PlanetUpdateOutput,
		DefaultError,
		PlanetUpdateInput
	>({
		mutationFn: (input) => orpc.planet.create.call(input),
		onSuccess: () => {
			refetch();
			setPlanet("");
		},
	});

	const submitPlanet = useCallback(() => {
		addPlanet({ name: planet });
	}, [addPlanet, planet]);

	return (
		<div
			className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-white"
			style={{
				backgroundImage:
					"radial-gradient(50% 50% at 50% 50%, #D2149D 0%, #8E1066 50%, #2D0A1F 100%)",
			}}
		>
			<div className="w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10">
				<h1 className="text-2xl mb-4">oRPC Planets list</h1>
				<ul className="mb-4 space-y-2">
					{data?.map((t) => (
						<li
							key={t.id}
							className="bg-white/10 border border-white/20 rounded-lg p-3 backdrop-blur-sm shadow-md"
						>
							<span className="text-lg text-white">{t.name}</span>
						</li>
					))}
				</ul>
				<div className="flex flex-col gap-2">
					<input
						type="text"
						value={planet}
						onChange={(e) => setPlanet(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								submitPlanet();
							}
						}}
						placeholder="Enter a new planet..."
						className="w-full px-4 py-3 rounded-lg border border-white/20 bg-white/10 backdrop-blur-sm text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
					/>
					<button
						type="submit"
						disabled={planet.trim().length === 0}
						onClick={submitPlanet}
						className="bg-blue-500 hover:bg-blue-600 disabled:bg-blue-500/50 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-colors"
					>
						Add planet
					</button>
				</div>
			</div>
		</div>
	);
}
