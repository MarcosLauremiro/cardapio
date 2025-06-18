import { HttpError } from "../middleware/HttpError";
import { User } from "../models/User";
import { DaySchedule } from "../types/express/types";

export async function setScheduleService(
	userId: string,
	schedule: DaySchedule[]
) {
	if (!Array.isArray(schedule) || schedule.length === 0) {
		throw new HttpError(400, "Envie um array de horários válido.");
	}

	for (const item of schedule) {
		if (
			typeof item.diaSemana !== "number" ||
			item.diaSemana < 0 ||
			item.diaSemana > 6
		) {
			throw new HttpError(
				400,
				"diaSemana deve estar entre 0 (domingo) e 6 (sábado)."
			);
		}
		if (!/^\d{2}:\d{2}$/.test(item.abertura)) {
			throw new HttpError(
				400,
				`Abertura '${item.abertura}' inválida (use HH:mm).`
			);
		}
		if (!/^\d{2}:\d{2}$/.test(item.fechamento)) {
			throw new HttpError(
				400,
				`Fechamento '${item.fechamento}' inválido (use HH:mm).`
			);
		}
	}

	const user = await User.findById(userId);
	if (!user) {
		throw new HttpError(404, "Estabelecimento não encontrado.");
	}

	const updated = await User.findByIdAndUpdate(
		userId,
		{ schedule },
		{ new: true, runValidators: true }
	).lean();

	if (!updated) {
		throw new HttpError(404, "Estabelecimento não encontrado.");
	}

	return { schedule: updated.schedule };
}
