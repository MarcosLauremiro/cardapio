// server.ts
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";
declare module "ws" {
	interface WebSocket {
		establishmentId?: string;
	}
}
import cors from "cors";
import { routerCategory } from "./routes/routesCategories";
import { productRouter } from "./routes/routesProducts";
import { routerOrders } from "./routes/routesOrders";
import { authRoutes } from "./routes/routesAuth";
import { establishmentRoutes } from "./routes/routesEstablishment";
import { errorHandler } from "./middleware/ErrorHandle";
import { setupSwagger } from "./utils/swagger";

export const wsClients = new Map<string, Set<WebSocket>>();

const mongoDB = process.env.MONGODB!;
if (!mongoDB) {
	throw new Error("Rota do banco de dados não fornecida");
}

mongoose
	.connect(mongoDB, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	} as mongoose.ConnectOptions)
	.then(() => {
		console.log("✅ Conectou ao MongoDB");
	})
	.catch((err) => {
		console.error("⁉️ Erro ao conectar no MongoDB:", err.message);
	})
	.then(() => {
		const app = express();
		app.use(cors({ origin: "http://localhost:5173" }));
		app.use(express.json());

		app.use("/categories", routerCategory);
		app.use("/products", productRouter);
		app.use("/orders", routerOrders);
		app.use("/establishment", establishmentRoutes);
		app.use(
			"/uploads",
			express.static(path.resolve(__dirname, "..", "uploads"))
		);
		app.use("/auth", authRoutes);

		setupSwagger(app);

		app.use(errorHandler);

		const port = process.env.PORT ? Number(process.env.PORT) : 3001;
		const httpServer = createServer(app);

		const wss = new WebSocketServer({ server: httpServer });

		wss.on("connection", async (ws: WebSocket, req) => {
			const url = req.url || "";
			const params = new URLSearchParams(url.replace("/?", ""));
			const token = params.get("token");

			if (!token) {
				ws.close(4001, "Token não fornecido");
				return;
			}

			try {
				const { verify } = await import("jsonwebtoken");
				const decoded = verify(token, process.env.PRIVATEKEY!) as {
					establishment: string;
				};
				const establishmentId = String(decoded.establishment);

				if (!wsClients.has(establishmentId)) {
					wsClients.set(establishmentId, new Set());
				}
				wsClients.get(establishmentId)!.add(ws);
				ws.establishmentId = establishmentId;

				console.log(`WS conectado para establishmentId=${establishmentId}`);

				ws.on("close", () => {
					const setOfSockets = wsClients.get(establishmentId);
					if (setOfSockets) {
						setOfSockets.delete(ws);
						if (setOfSockets.size === 0) {
							wsClients.delete(establishmentId);
						}
					}
					console.log(
						`WS desconectado para establishmentId=${establishmentId}`
					);
				});
			} catch (error) {
				ws.close(4002, `Token inválido error: ${error}`);
				return;
			}
		});

		httpServer.listen(port, () => {
			console.log(`🛸 HTTP+WS rodando em http://localhost:${port}`);
		});
	})
	.catch((err) => {
		console.error("⁉️ Erro ao conectar no MongoDB:", err);
	});
