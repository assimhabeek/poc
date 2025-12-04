import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { apiReference } from "@scalar/nestjs-api-reference";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bodyParser: false,
	});
	const port = process.env.PORT ?? 4200;

	const config = new DocumentBuilder().build();
	const docsPath = "/api/docs";

	const documentFactory = () => SwaggerModule.createDocument(app, config);
	app.use(docsPath, apiReference({ content: documentFactory }));

	await app.listen(port);

	Logger.log(
		`🚀 Application is running on: http://127.0.0.1:${port}${docsPath}`,
	);
}
bootstrap();
