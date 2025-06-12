import { Express } from "express";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import path from "path";

export function setupSwagger(app: Express) {
	const options: swaggerJSDoc.Options = {
		definition: {
			openapi: "3.0.0",
			info: {
				title: "Establishment API",
				version: "1.0.0",
				description:
					"API para gerenciamento de estabelecimentos com sistema de assinatura",
			},
			components: {
				securitySchemes: {
					bearerAuth: {
						type: "http",
						scheme: "bearer",
						bearerFormat: "JWT",
						description: "Token JWT obtido no endpoint de login",
					},
				},
			},
		},
		apis: [path.resolve(__dirname, "../routes/*.ts")],
	};

	const swaggerSpec = swaggerJSDoc(options);
	// Monta o Swagger UI em /api-docs
	app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
}
