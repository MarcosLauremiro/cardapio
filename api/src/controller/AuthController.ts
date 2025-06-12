import { Request, Response } from "express";
import { generateToken } from "../service/authService";
import { Establishment } from "../models/Establishment";
import bcrypt from "bcryptjs";

export async function loginHandle(req: Request, res: Response) {
	const { email, password } = req.body;
	console.log("veio aqui no controller");
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

		const response = {
			token: token,
			establishment: establishment,
		};

		res.status(200).json({ response });
	} catch (error) {
		console.error("Erro ao gerar JWT:", error);
		res.status(500).json({ message: "Erro ao gerar token JWT" });
	}
}

export async function register(req: Request, res: Response) {
	try {
		const { name, phone, email, password } = req.body;

		if (!name || !phone || !email || !password) {
			res.status(400).json({
				message: "Todos os campos são obrigatórios",
			});
		}

		const exists = await Establishment.findOne({ email });
		if (exists) {
			res.status(409).json({ message: "E-mail já cadastrado" });
		}

		const salt = await bcrypt.genSalt(12);
		const hashed = await bcrypt.hash(password, salt);

		const slug = name
			.toLowerCase()
			.normalize("NFD")
			.replace(/[\u0300-\u036f]/g, "") // Remove acentos
			.replace(/[^a-z0-9\s-]/g, "") // Remove caracteres especiais
			.replace(/\s+/g, "-") // Substitui espaços por hífens
			.replace(/-+/g, "-") // Remove hífens duplicados
			.trim();

		let uniqueSlug = slug;
		const count = 1;

		while (await Establishment.findOne({ slug: uniqueSlug })) {
			uniqueSlug = `${slug}-${count}`;
		}

		const establishment = await Establishment.create({
			name: name.trim(),
			phone: phone.trim(),
			email: email.toLowerCase().trim(),
			slug: uniqueSlug,
			status: "pending",
			password: hashed,
		});

		const token = generateToken({ userId: establishment._id });

		const establishmentResponse = {
			_id: establishment._id,
			name: establishment.name,
			email: establishment.email,
			phone: establishment.phone,
			slug: establishment.slug,
			status: establishment.status,
			createdAt: establishment.createdAt,
		};

		res.status(201).json({
			message: "Estabelecimento registrado com sucesso",
			establishment: establishmentResponse,
			token,
		});
	} catch (error) {
		console.error("Erro no registro:", error);
		res.status(500).json({ message: "Erro interno no servidor" });
	}
}
