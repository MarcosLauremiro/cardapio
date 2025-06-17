import "dotenv/config";
import { connectDatabase } from "./config/database";
import { startServer } from "./server";

const bootstrap = async () => {
	try {
		await connectDatabase();
		startServer();
	} catch (error) {
		console.error("⁉️ Erro ao inicializar a aplicação:", error);
		process.exit(1);
	}
};

bootstrap();
