import multer from "multer";
import path from "node:path";
import { Router } from "express";
import {
	createProducts,
	deletProducts,
	listProducts,
} from "../controller/ProductController";

export const productRouter = Router();

export const upload = multer({
	storage: multer.diskStorage({
		destination: function (req, file, callback) {
			callback(null, path.resolve(__dirname, "..", "..", "uploads"));
		},
		filename: function (req, file, callback) {
			callback(null, `${Date.now()}-${file.originalname}`);
		},
	}),
});

//list products
productRouter.get("/", listProducts);

//create product
productRouter.post("/", upload.single("image"), createProducts);

//delet products
productRouter.delete("/:productId", deletProducts);
