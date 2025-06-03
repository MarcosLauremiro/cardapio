// server.ts
import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import { createServer } from "http";
import { WebSocketServer, WebSocket } from "ws";

// Extende a interface WebSocket para incluir establishmentId
declare module "ws" {
	interface WebSocket {
		establishmentId?: string;
	}
}

// rotas
import { routerCategory } from "./routes/routesCategories";
import { productRouter } from "./routes/routesProducts";
import { routerOrders } from "./routes/routesOrders";
import { authRoutes } from "./routes/routesAuth";
import { establishmentRoutes } from "./routes/establishmentRoutes";

// Map para guardar, para cada establishmentId, o(s) WebSocket(s) conectados
export const wsClients = new Map<string, Set<WebSocket>>();

const mongoDB = process.env.MONGODB!;
if (!mongoDB) {
	throw new Error("Rota do banco de dados não fornecida");
}

mongoose
	.connect(mongoDB)
	.then(() => {
		const app = express();
		app.use(express.json());

		// Monta suas rotas REST normalmente
		app.use("/categories", routerCategory);
		app.use("/products", productRouter);
		app.use("/orders", routerOrders);
		app.use("/establishment", establishmentRoutes);
		app.use(
			"/uploads",
			express.static(path.resolve(__dirname, "..", "uploads"))
		);
		app.use("/", authRoutes);

		// Cria o servidor HTTP “manual” a partir do Express
		const port = process.env.PORT ? Number(process.env.PORT) : 3001;
		const httpServer = createServer(app);

		// Agora “anexa” o WebSocketServer a esse httpServer
		const wss = new WebSocketServer({ server: httpServer });

		wss.on("connection", async (ws: WebSocket, req) => {
			// Extrai o token JWT da query string, por exemplo: ws://localhost:3001/?token=XXX
			const url = req.url || "";
			const params = new URLSearchParams(url.replace("/?", ""));
			const token = params.get("token");

			if (!token) {
				ws.close(4001, "Token não fornecido");
				return;
			}

			try {
				// Decodifica o JWT para pegar o establishmentId
				const { verify } = await import("jsonwebtoken");
				const decoded = verify(token, process.env.PRIVATEKEY!) as {
					establishment: string;
				};
				const establishmentId = String(decoded.establishment);

				// Guarda esse ws no Map
				if (!wsClients.has(establishmentId)) {
					wsClients.set(establishmentId, new Set());
				}
				wsClients.get(establishmentId)!.add(ws);
				// Armazena no próprio ws para saber quem é, na hora de desconectar
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

		// Faz o httpServer (Express + WS) escutar na porta 3001
		httpServer.listen(port, () => {
			console.log(`🛸 HTTP+WS rodando em http://localhost:${port}`);
		});
	})
	.catch((err) => {
		console.error("⁉️ Erro ao conectar no MongoDB:", err);
	});
