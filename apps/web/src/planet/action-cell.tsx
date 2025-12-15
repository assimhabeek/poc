import type { Planet } from "@codelab/domain/planet";
import { Button } from "@codelab/shadcn/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@codelab/shadcn/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
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
