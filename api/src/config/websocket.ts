import { WebSocketServer, WebSocket } from "ws";
import { Server } from "http";
import { verify } from "jsonwebtoken";

declare module "ws" {
	interface WebSocket {
		establishmentId?: string;
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
				console.log(`WS desconectado para establishmentId=${establishmentId}`);
			});
		} catch (error) {
			ws.close(4002, `Token inválido error: ${error}`);
			return;
		}
	});

	return wss;
};
