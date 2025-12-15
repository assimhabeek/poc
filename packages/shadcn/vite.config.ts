import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path, { resolve } from "path";
import { defineConfig } from "vite";
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
	build: {
		cssCodeSplit: true,

		lib: {
			entry: {
				accordion: resolve(__dirname, "src/components/ui/accordion.tsx"),
				"alert-dialog": resolve(
					__dirname,
					"src/components/ui/alert-dialog.tsx",
				),
				alert: resolve(__dirname, "src/components/ui/alert.tsx"),
				"aspect-ratio": resolve(
					__dirname,
					"src/components/ui/aspect-ratio.tsx",
				),
				avatar: resolve(__dirname, "src/components/ui/avatar.tsx"),
				badge: resolve(__dirname, "src/components/ui/badge.tsx"),
				breadcrumb: resolve(__dirname, "src/components/ui/breadcrumb.tsx"),
				"button-group": resolve(
					__dirname,
					"src/components/ui/button-group.tsx",
				),
				button: resolve(__dirname, "src/components/ui/button.tsx"),
				calendar: resolve(__dirname, "src/components/ui/calendar.tsx"),
				card: resolve(__dirname, "src/components/ui/card.tsx"),
				carousel: resolve(__dirname, "src/components/ui/carousel.tsx"),
				chart: resolve(__dirname, "src/components/ui/chart.tsx"),
				checkbox: resolve(__dirname, "src/components/ui/checkbox.tsx"),
				collapsible: resolve(__dirname, "src/components/ui/collapsible.tsx"),
				command: resolve(__dirname, "src/components/ui/command.tsx"),
				"context-menu": resolve(
					__dirname,
					"src/components/ui/context-menu.tsx",
				),
				dialog: resolve(__dirname, "src/components/ui/dialog.tsx"),
				drawer: resolve(__dirname, "src/components/ui/drawer.tsx"),
				"dropdown-menu": resolve(
					__dirname,
					"src/components/ui/dropdown-menu.tsx",
				),
				empty: resolve(__dirname, "src/components/ui/empty.tsx"),
				field: resolve(__dirname, "src/components/ui/field.tsx"),
				form: resolve(__dirname, "src/components/ui/form.tsx"),
				"hover-card": resolve(__dirname, "src/components/ui/hover-card.tsx"),
				"input-group": resolve(__dirname, "src/components/ui/input-group.tsx"),
				"input-otp": resolve(__dirname, "src/components/ui/input-otp.tsx"),
				input: resolve(__dirname, "src/components/ui/input.tsx"),
				item: resolve(__dirname, "src/components/ui/item.tsx"),
				kbd: resolve(__dirname, "src/components/ui/kbd.tsx"),
				label: resolve(__dirname, "src/components/ui/label.tsx"),
				menubar: resolve(__dirname, "src/components/ui/menubar.tsx"),
				"navigation-menu": resolve(
					__dirname,
					"src/components/ui/navigation-menu.tsx",
				),
				pagination: resolve(__dirname, "src/components/ui/pagination.tsx"),
				popover: resolve(__dirname, "src/components/ui/popover.tsx"),
				progress: resolve(__dirname, "src/components/ui/progress.tsx"),
				"radio-group": resolve(__dirname, "src/components/ui/radio-group.tsx"),
				resizable: resolve(__dirname, "src/components/ui/resizable.tsx"),
				"scroll-area": resolve(__dirname, "src/components/ui/scroll-area.tsx"),
				select: resolve(__dirname, "src/components/ui/select.tsx"),
				separator: resolve(__dirname, "src/components/ui/separator.tsx"),
				sheet: resolve(__dirname, "src/components/ui/sheet.tsx"),
				sidebar: resolve(__dirname, "src/components/ui/sidebar.tsx"),
				skeleton: resolve(__dirname, "src/components/ui/skeleton.tsx"),
				slider: resolve(__dirname, "src/components/ui/slider.tsx"),
				sonner: resolve(__dirname, "src/components/ui/sonner.tsx"),
				spinner: resolve(__dirname, "src/components/ui/spinner.tsx"),
				switch: resolve(__dirname, "src/components/ui/switch.tsx"),
				table: resolve(__dirname, "src/components/ui/table.tsx"),
				tabs: resolve(__dirname, "src/components/ui/tabs.tsx"),
				textarea: resolve(__dirname, "src/components/ui/textarea.tsx"),
				"toggle-group": resolve(
					__dirname,
					"src/components/ui/toggle-group.tsx",
				),
				toggle: resolve(__dirname, "src/components/ui/toggle.tsx"),
				tooltip: resolve(__dirname, "src/components/ui/tooltip.tsx"),
				style: resolve(__dirname, "src/index.css"),
			},
			formats: ["es"],
			name: "@codelab/shadcn",
		},
		rollupOptions: {
			external: ["react", "react-dom", "react/jsx-runtime"],
		},
	},
	plugins: [react(), tailwindcss(), dts({ insertTypesEntry: true })],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./src"),
		},
	},
});
