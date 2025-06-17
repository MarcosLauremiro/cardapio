import mongoose from "mongoose";

export const connectDatabase = async (): Promise<void> => {
	const mongoDB = process.env.MONGODB;

	if (!mongoDB) {
		throw new Error("Rota do banco de dados não fornecida ⛔");
	}

	try {
		await mongoose.connect(mongoDB, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		} as mongoose.ConnectOptions);

		console.log("✅ Conectou ao MongoDB");
	} catch (error) {
		console.error("⁉️ Erro ao conectar no MongoDB:");
		throw error;
	}
};
