import { Request, Response } from "express";

import { Category } from "../models/Category";
import { Product } from "../models/Product";

export async function listCategories(req: Request, res: Response) {
	const categories = await Category.find();
	res.json(categories);
}

export async function CreateCategory(req: Request, res: Response) {
	try {
		const { icon, name, establishment } = req.body;

		const category = await Category.create({ icon, name, establishment });

		res.status(201).json(category);
	} catch (error) {
		console.log(error);
		res.status(500);
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
