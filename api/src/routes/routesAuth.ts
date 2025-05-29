import { Router } from "express";
import {
	loginHandle,
	register,
} from "../controller/AuthController";

export const authRoutes = Router();

authRoutes.post("/login", loginHandle);

authRoutes.post("/register", register);


