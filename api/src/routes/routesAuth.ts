import { Router } from "express";
import {
	findOneUser,
	loginHandle,
	register,
} from "../controller/AuthController";
import { ensureAuth } from "../middleware/authMiddlewate";

export const authRoutes = Router();

authRoutes.post("/login", loginHandle);

authRoutes.post("/register", register);

authRoutes.get("/user", ensureAuth, findOneUser);
