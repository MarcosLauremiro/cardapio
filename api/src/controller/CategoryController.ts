import { Request, Response } from "express";

import { Category } from "../models/Category";
import { Product } from "../models/Product";
import { createCategoryService } from "../service/CategorySercice";
import { HttpError } from "../middleware/HttpError";

export async function listCategories(req: Request, res: Response) {
	try {
		const categories = await Category.find().sort({ name: 1 });
		res.json(categories);
	} catch (error) {
		console.error("erro ao listar", error);
	}
}

export async function CreateCategory(req: Request, res: Response) {
	try {
		const userId = res.locals.userId as string;

		const { icon, name, isActive } = req.body;

		const category = await createCategoryService({
			name,
			icon,
			userId,
			isActive,
		});

		res.status(201).json(category);
	} catch (error) {
		if (error instanceof HttpError) {
			res.status(error.status).json({ message: error.message });
		}
		res.status(500).json({ message: "Erro interno do servidor." });
	}
}

export async function listProductsByCategory(req: Request, res: Response) {
	try {
		const { categoryId } = req.params;
		const products = await Product.find().where("category").equals(categoryId);
		res.status(200).json(products);
	} catch (error) {
		console.log(error);
		res.status(500);
	}
}

export async function updateCategory(req: Request, res: Response) {
	try {
		const userId = res.locals.userId;
		const { categoryId } = req.params;
		const updates = req.body;

		const category = await Category.findOneAndUpdate(
			{ _id: categoryId, userId: userId },
			updates,
			{ new: true, runValidators: true }
		);

		if (!category) {
			res.status(404).json({
				message:
					"Categoria não encontrada ou não pertence a este estabelecimento.",
			});
		}

		res.status(200).json(category);
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Erro ao atualizar categoria." });
	}
}

export async function deleteCategory(req: Request, res: Response) {
	try {
		const userId = res.locals.userId;
		const { categoryId } = req.params;
		await Category.findOneAndDelete({
			_id: categoryId,
			userId: userId,
		});

		res.status(200).json({ message: "Categoria deletada com sucesso" });
	} catch (error) {
		console.error(error);
		res.status(500).json({ message: "Erro ao detetar categoria." });
	}
}
