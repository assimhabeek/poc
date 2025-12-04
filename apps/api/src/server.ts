import { createServer } from "node:http";
import { OpenAPIHandler } from "@orpc/openapi/node";
import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { CORSPlugin } from "@orpc/server/plugins";
import { ZodToJsonSchemaConverter } from "@orpc/zod";
import { router } from "./router";

const handler = new OpenAPIHandler(router, {
	plugins: [
		new CORSPlugin(),
		new OpenAPIReferencePlugin({
			schemaConverters: [new ZodToJsonSchemaConverter()],
		}),
	],
	interceptors: [
		onError((error) => {
			console.error(error);
		}),
	],
});

const server = createServer(async (req, res) => {
	const { matched } = await handler.handle(req, res, {
		context: { headers: req.headers },
	});

	if (!matched) {
		res.statusCode = 404;
		res.end("No procedure matched");
	}
});

server.listen(4200, "127.0.0.1", () =>
	console.log("Listening on http://127.0.0.1:4200"),
);
