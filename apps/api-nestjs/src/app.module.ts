import { Module } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { ORPCModule, onError } from "@orpc/nest";
import { ZodSmartCoercionPlugin } from "@orpc/zod";
import { AppController } from "./app.controller";

declare module "@orpc/nest" {
	/**
	 * Extend oRPC global context to make it type-safe inside your handlers/middlewares
	 */
	interface ORPCGlobalContext {
		request: Request;
	}
}
@Module({
	imports: [
		ORPCModule.forRootAsync({
			useFactory: (request: Request) => ({
				interceptors: [
					onError((error) => {
						console.error(error);
					}),
				],
				context: { request }, // oRPC context, accessible from middlewares, etc.
				eventIteratorKeepAliveInterval: 5000, // 5 seconds
				customJsonSerializers: [],
				plugins: [new ZodSmartCoercionPlugin()],
			}),
			inject: [REQUEST],
		}),
	],
	controllers: [AppController],
	providers: [],
})
export class AppModule {}
