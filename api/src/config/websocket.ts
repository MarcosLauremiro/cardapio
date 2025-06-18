import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";
import { verify } from "jsonwebtoken";

declare module "ws" {
	interface WebSocket {
		userId?: string;
	}
}

export const wsClients = new Map<string, Set<WebSocket>>();

export const setupWebSocket = (httpServer: Server): WebSocketServer => {
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
			const decoded = verify(token, process.env.PRIVATEKEY!) as {
				userId: string;
			};
			const userId = String(decoded.userId);

			if (!wsClients.has(userId)) {
				wsClients.set(userId, new Set());
			}
			wsClients.get(userId)!.add(ws);
			ws.userId = userId;

			console.log(`WS conectado para userId=${userId}`);

			ws.on("close", () => {
				const setOfSockets = wsClients.get(userId);
				if (setOfSockets) {
					setOfSockets.delete(ws);
					if (setOfSockets.size === 0) {
						wsClients.delete(userId);
					}
				}
				console.log(`WS desconectado para userId=${userId}`);
			});
		} catch (error) {
			ws.close(4002, `Token inválido error: ${error}`);
			return;
		}
	});

	return wss;
};
