import { Request, Response } from "express";
import { Product } from "../models/Product";

export async function listProducts(req: Request, res: Response) {
	try {
		const products = await Product.find();
		res.json(products);
	} catch (error) {
		console.log(error);
		res.status(500);
	}
}

export async function createProducts(req: Request, res: Response) {
	try {
		const establishmentId = res.locals.establishmentId as string;
		const imagePath = req.file?.filename;
		const { name, description, price, category, ingredients } = req.body;

		const product = await Product.create({
			name,
			description,
			price: Number(price),
			imagePath: imagePath,
			category,
			ingredients: ingredients ? JSON.parse(ingredients) : [],
			establishment: establishmentId,
		});

		res.status(201).json(product);
	} catch (error) {
		console.log(error);
		res.status(500);
	}
}

export async function deletProducts(req: Request, res: Response) {
	try {
		const { productId } = req.params;
		await Product.findByIdAndDelete(productId);

		res.sendStatus(204);
	} catch (error) {
		console.log(error);
		res.status(500);
	}
}
