import { Router } from "express";
import {
	CreateCategory,
	listCategories,
	listProductsByCategory,
} from "../controller/CategoryController";

export const routerCategory = Router();

//List categories
routerCategory.get("/", listCategories);

//Create Category
routerCategory.post("/", CreateCategory);

//get products by category
routerCategory.get("/:categoryId/products", listProductsByCategory);
