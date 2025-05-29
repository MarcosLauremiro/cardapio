import { Router } from "express";
import {
	CreateCategory,
	listCategories,
	listProductsByCategory,
} from "../controller/CategoryController";
import { ensureAuth } from "../middleware/authMiddlewate";

export const routerCategory = Router();

//List categories
routerCategory.get("/", listCategories);

//Create Category
routerCategory.post("/", ensureAuth, CreateCategory);

//get products by category
routerCategory.get("/:categoryId/products", listProductsByCategory);
