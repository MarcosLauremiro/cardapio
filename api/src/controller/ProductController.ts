import { Request, Response } from "express";
import { Product } from "../models/Product";

export async function listProducts(req: Request, res: Response) {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Erro interno do servidor" });
	}
}

export async function createProducts(req: Request, res: Response) {
	try {
		const userId = res.locals.userId;
		const imageUrl = req.file?.path;
		const { name, description, price, category, ingredients } = req.body;
		const product = await Product.create({
			name,
			description,
			price: Number(price),
			imagePath: imageUrl,
			category,
			ingredients: ingredients ? JSON.parse(ingredients) : [],
			userId: userId,
		});
		res.status(201).json(product);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Erro interno do servidor" });
	}
}

export async function deleteProducts(req: Request, res: Response) {
	try {
		const { productId } = req.params;
		await Product.findByIdAndDelete(productId);
		res.status(204).json({ message: "Produto deletado com sucesso" });
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Erro interno do servidor" });
	}
}

export async function updateProducts(req: Request, res: Response) {
	try {
		const { productId } = req.params;
		const { name, description, price, category, ingredients } = req.body;

		const product = await Product.findByIdAndUpdate(
			productId,
			{
				name,
				description,
				price: Number(price),
				category,
				ingredients: ingredients ? JSON.parse(ingredients) : [],
			},
			{ new: true }
		);

		if (!product) {
			res.status(404).json({ error: "Produto não encontrado" });
		}

		res.json(product);
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Erro interno do servidor" });
	}
}
