"use client";

import type { Planet } from "@codelab/domain/planet";
import type { ColumnDef } from "@tanstack/react-table";
import { ActionCell, type ActionCellProps } from "./action-cell";

type Input = Omit<ActionCellProps, "planet">;
type Output = ColumnDef<Planet>[];

export const columns = ({ onDelete, onUpdate }: Input): Output => [
	{
		accessorKey: "id",
		header: "ID",
	},
	{
		accessorKey: "name",
		header: "Name",
	},
	{
		accessorKey: "description",
		header: "Description",
	},
	{
		id: "actions",
		enableHiding: false,
		cell: ({ row }) => (
			<ActionCell
				planet={row.original}
				onDelete={onDelete}
				onUpdate={onUpdate}
			/>
		),
	},
];
