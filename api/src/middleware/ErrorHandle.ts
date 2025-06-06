import { Request, Response } from "express";
import { HttpError } from "./HttpError";

export function errorHandler(err: unknown, req: Request, res: Response) {
	if (err instanceof HttpError) {
		res.status(err.status).json({ message: err.message });
	}

	console.error(err);
	res.status(500).json({ message: "Erro interno do servidor." });
}
