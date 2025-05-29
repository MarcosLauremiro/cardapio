import { Request, Response } from "express";
import { generateToken } from "../service/authService";
import { Establishment } from "../models/Establishment";
import bcrypt from "bcryptjs";

export async function loginHandle(req: Request, res: Response) {
	const { email, password } = req.body;
	try {
		const establishment = await Establishment.findOne({ email });
		if (!establishment) {
			res.status(401).json({ message: "Credenciais inválidas" });
			return;
		}

		const match = await bcrypt.compare(password, establishment.password);
		if (!match) {
			res.status(401).json({ message: "Credenciais inválidas" });
		}
		const token = generateToken({ establishment: establishment._id });

		res.status(200).json({ token });
	} catch (error) {
		console.error("Erro ao gerar JWT:", error);
		res.status(500).json({ message: "Erro ao gerar token JWT" });
	}
}

export async function register(req: Request, res: Response) {
	try {
		const { name, phone, email, password } = req.body;
		const exists = await Establishment.findOne({ email });
		if (exists) {
			res.status(409).json({ message: "E-mail já cadastrado" });
		}

		const salt = await bcrypt.genSalt(12);
		const hashed = await bcrypt.hash(password, salt);

		const establishment = await Establishment.create({
			name,
			phone,
			email,
			password: hashed,
		});

		const token = generateToken({ userId: establishment._id });

		res.status(201).json({
			establishment,
			token,
		});
	} catch (error) {
		console.error("Erro no registro:", error);
		res.status(500).json({ message: "Erro interno no servidor" });
	}
}
