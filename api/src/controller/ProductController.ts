import { Request, Response } from "express";
import { Product } from "../models/Product";

export async function listProducts(req: Request, res: Response) {
	try {
		// Parâmetros de paginação da query string
		const page = parseInt(req.query.page as string) || 1;
		const limit = parseInt(req.query.limit as string) || 10;
		const skip = (page - 1) * limit;

		// Buscar produtos com paginação
		const products = await Product.find()
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 }); // Ordenar pelos mais recentes

		// Contar total de produtos para metadados
		const totalProducts = await Product.countDocuments();
		const totalPages = Math.ceil(totalProducts / limit);

		// Resposta com metadados de paginação
		res.json({
			data: products,
			pagination: {
				currentPage: page,
				totalPages,
				totalItems: totalProducts,
				itemsPerPage: limit,
				hasNextPage: page < totalPages,
				hasPrevPage: page > 1,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Erro interno do servidor" });
	}
}

export async function listProductsWithSkip(req: Request, res: Response) {
	try {
		const limit = parseInt(req.query.limit as string) || 10;
		const skip = parseInt(req.query.skip as string) || 0;

		if (limit > 100) {
			return res
				.status(400)
				.json({ error: "Limit não pode ser maior que 100" });
		}

		const products = await Product.find()
			.skip(skip)
			.limit(limit)
			.sort({ createdAt: -1 });

		const totalProducts = await Product.countDocuments();

		res.json({
			data: products,
			pagination: {
				limit,
				skip,
				total: totalProducts,
				hasMore: skip + limit < totalProducts,
			},
		});
	} catch (error) {
		console.log(error);
		res.status(500).json({ error: "Erro interno do servidor" });
	}
}

export async function createProducts(req: Request, res: Response) {
	try {
		const establishmentId = res.locals.establishmentId as string;
		const imageUrl = req.file?.path;
		const { name, description, price, category, ingredients } = req.body;
		const product = await Product.create({
			name,
			description,
			price: Number(price),
			imagePath: imageUrl,
			category,
			ingredients: ingredients ? JSON.parse(ingredients) : [],
			establishment: establishmentId,
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
