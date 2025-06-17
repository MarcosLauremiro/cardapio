import express from "express";
import cors from "cors";
import { routerCategory } from "./routes/routesCategories";
import { productRouter } from "./routes/routesProducts";
import { routerOrders } from "./routes/routesOrders";
import { authRoutes } from "./routes/routesAuth";
import { establishmentRoutes } from "./routes/routesEstablishment";
import { errorHandler } from "./middleware/ErrorHandle";
import { setupSwagger } from "./utils/swagger";
import { uploadRouter } from "./routes/RouterUpload";

export const createApp = (): express.Application => {
	const app = express();

	// Middlewares
	app.use(cors({ origin: "http://localhost:5173" }));
	app.use(express.json());

	// Routes
	app.use("/categories", routerCategory);
	app.use("/products", productRouter);
	app.use("/orders", routerOrders);
	app.use("/establishment", establishmentRoutes);
	app.use("/auth", authRoutes);
	app.use("/upload-image", uploadRouter);

	// Swagger
	setupSwagger(app);

	// Error handler
	app.use(errorHandler);

	return app;
};
