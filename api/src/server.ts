import { createServer } from "http";
import { createApp } from "./app";
import { setupWebSocket } from "./config/websocket";

export const startServer = () => {
	const app = createApp();
	const port = process.env.PORT ? Number(process.env.PORT) : 3001;
	const httpServer = createServer(app);

	// Setup WebSocket
	setupWebSocket(httpServer);

	httpServer.listen(port, () => {
		console.log(`🛸 HTTP+WS rodando em http://localhost:${port}`);
	});

	return httpServer;
};
