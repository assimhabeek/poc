import type {
	Planet,
	PlanetDeleteInput,
	PlanetUpdateInput,
} from "@codelab/domain/planet";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export interface ActionCellProps {
	planet: Planet;
	onDelete: (input: Planet) => void;
	onUpdate: (input: Planet) => void;
}

export const ActionCell = ({ planet, onUpdate, onDelete }: ActionCellProps) => {
	return (
		<DropdownMenu modal={false}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="h-8 w-8 p-0">
					<span className="sr-only">Open menu</span>
					<MoreHorizontal />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuLabel>Actions</DropdownMenuLabel>
				<DropdownMenuItem onClick={() => onUpdate(planet)}>
					Update
				</DropdownMenuItem>
				<DropdownMenuSeparator />
				<DropdownMenuItem
					onClick={() => onDelete(planet)}
					className="text-red-600 focus:text-red-600 focus:bg-red-100"
				>
					Delete
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};
