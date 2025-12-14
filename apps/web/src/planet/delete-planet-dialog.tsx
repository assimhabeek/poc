"use client";

import type { Planet, PlanetDeleteInput } from "@codelab/domain/planet";
import { type PropsWithChildren, useState } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Props {
	planet: Planet;
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onAction: (input: PlanetDeleteInput) => void;
}
export const DeletePlanetDialog = ({
	planet,
	open,
	onOpenChange,
	onAction,
}: Props) => {
	return (
		<AlertDialog open={open} onOpenChange={onOpenChange}>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>Delete Planet Confirmation</AlertDialogTitle>
					<AlertDialogDescription>
						{" "}
						Are you sure you want to delete{" "}
						<span className="font-semibold">{planet.name}</span>?
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={() => onAction({ id: planet.id })}>
						Delete
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};
