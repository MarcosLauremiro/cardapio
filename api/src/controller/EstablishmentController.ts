import { Request, Response } from "express";
import { Establishment } from "../models/Establishment";
import { setScheduleService } from "../service/establishmentService";

export async function findEstablishment(req: Request, res: Response) {
	try {
		const establishmentId = res.locals.establishmentId as string;
		if (!establishmentId) {
			res.status(401).json({ message: "Não autenticado" });
		}

		const establishment = await Establishment.findById(establishmentId).select(
			"-password"
		);

		if (!establishment) {
			res.status(404).json({ message: "Estabelecimento Não encontrado" });
		}

		res.json(establishment);
	} catch (error) {
		console.log("Erro ao buscar usuário", error);
		res.status(500).json({ message: "Error interno no servidor" });
	}
}

export async function setSchedule(req: Request, res: Response) {
	try {
		const establishmentId = res.locals.establishmentId as string;
		const schedule = req.body.schedule;

		const updated = await setScheduleService(establishmentId, schedule);

		res.json(updated);
	} catch (error) {
		console.log("Erro ao alterar Horarios", error);
		res.status(500).json({ message: "Erro interno ao atualizar horário." });
	}
}
