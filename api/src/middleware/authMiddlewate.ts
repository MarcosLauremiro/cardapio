import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { User } from "../models/User";

const privateKey = process.env.PRIVATEKEY!;
if (!privateKey) throw new Error("chave JWT não definida em PRIVATEKEY");

export const ensureAuth = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const authHeader = req.headers.authorization;
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		res.status(401).json({ message: "Token não fornecido" });
	}

	const token = authHeader?.split(" ")[1];
	try {
		const decoded = jwt.verify(token!, privateKey) as JwtPayload;
		if (!decoded?.userId) {
			res.status(401).json({ message: "Token inválido" });
		}

		res.locals.userId = String(decoded.userId);

		next();
	} catch (error) {
		console.log("JWT inválido", error);
		res.status(401).json({ message: "Token inválido" });
	}
};

export const verifyIdEstablishment = (
	req: Request,
	res: Response,
	next: NextFunction
): void => {
	const userId = req.body.userId;
	if (!userId) {
		res.status(401).json({ message: "id do estabelecimento não enviado" });
	}
	try {
		const user = User.findById({ userId });

		if (!user) {
			res.status(400).json({ message: "Estabelecimento não encontrado" });
		}

		next();
	} catch (error) {
		console.error("Id do estabelecimento invalido", error);
		res
			.status(401)
			.json({ message: "Id do estabelecimento não encontrado ou invalido" });
	}
};
