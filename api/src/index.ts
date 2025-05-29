import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import { routerCategory } from "./routes/routesCategories";
import { productRouter } from "./routes/routesProducts";
import path from "path";
import { routerOrders } from "./routes/routesOrders";
import { authRoutes } from "./routes/routesAuth";
import { error } from "console";
import { establishmentRoutes } from "./routes/establishmentRoutes";

const mongoDB = process.env.MONGODB;
if (!mongoDB) {
	throw error("Rota do banco de dados não fornecida");
}

mongoose
	.connect(mongoDB)
	.then(() => {
		const app = express();
		const port = process.env.PORT || 3001;
		app.use(express.json());

		app.use("/categories", routerCategory);
		app.use("/products", productRouter);
		app.use("/orders", routerOrders);
		app.use("/establishment", establishmentRoutes);
		app.use(
			"/uploads",
			express.static(path.resolve(__dirname, "..", "uploads"))
		);
		app.use("/", authRoutes);

		app.listen(port, () => {
			console.log(`🛸 Sercer is running on http://localhost:${port}`);
			console.log(`Swagger em http://localhost:${port}/api-docs`);
		});
		console.log("✅ Conect in mongo");
	})
	.catch(() => console.log("⁉️ Error in conect to mongo"));
