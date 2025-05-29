import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

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

		if (!decoded || typeof decoded !== "object" || !decoded.userId) {
			res.status(401).json({ message: "Token inválido" });
		}

		req.userId = String(decoded.userId);
		next();
	} catch (error) {
		console.log("JWT inválido", error);
		res.status(401).json({ message: "Token inválido" });
	}
};
