import { Router } from "express";
import {
	CreateCategory,
	deleteCategory,
	listCategories,
	listProductsByCategory,
	updateCategory,
} from "../controller/CategoryController";
import { ensureAuth } from "../middleware/AuthMiddlewate";

export const routerCategory = Router();

//List categories
routerCategory.get("/", ensureAuth, listCategories);

//Create Category
routerCategory.post("/", ensureAuth, CreateCategory);

//get products by category
routerCategory.get("/:categoryId/products", ensureAuth, listProductsByCategory) ;

//update category
routerCategory.put("/:categoryId", ensureAuth, updateCategory);

routerCategory.delete("/:categoryId", ensureAuth, deleteCategory);
