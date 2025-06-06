import { Router } from "express";
import { ensureAuth } from "../middleware/AuthMiddlewate";
import {
	findEstablishment,
	setSchedule,
} from "../controller/EstablishmentController";

export const establishmentRoutes = Router();

establishmentRoutes.get("/", ensureAuth, findEstablishment);

//atualiza o horario de funcionamento
establishmentRoutes.put("/schedule", ensureAuth, setSchedule);
