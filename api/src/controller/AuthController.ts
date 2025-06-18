import { Request, Response } from "express";
import { generateToken } from "../service/authService";
import { User } from "../models/User";
import bcrypt from "bcryptjs";

export async function loginHandle(req: Request, res: Response) {
	const { email, password } = req.body;
	try {
		const user = await User.findOne({ email });
		if (!user) {
			res.status(401).json({ message: "Credenciais inválidas" });
			return;
		}

		const match = await bcrypt.compare(password, user.password);
		if (!match) {
			res.status(401).json({ message: "Credenciais inválidas" });
		}
		const token = generateToken({ userId: user._id });

		const response = {
			token: token,
			userId: user,
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

		const exists = await User.findOne({ email });
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

		while (await User.findOne({ slug: uniqueSlug })) {
			uniqueSlug = `${slug}-${count}`;
		}

		const user = await User.create({
			name: name.trim(),
			phone: phone.trim(),
			email: email.toLowerCase().trim(),
			slug: uniqueSlug,
			status: "pending",
			password: hashed,
		});

		const token = generateToken({ userId: user._id });

		const establishmentResponse = {
			_id: user._id,
			name: user.name,
			email: user.email,
			phone: user.phone,
			slug: user.slug,
			status: user.status,
			createdAt: user.createdAt,
		};

		res.status(201).json({
			message: "Estabelecimento registrado com sucesso",
			user: establishmentResponse,
			token,
		});
	} catch (error) {
		console.error("Erro no registro:", error);
		res.status(500).json({ message: "Erro interno no servidor" });
	}
}
