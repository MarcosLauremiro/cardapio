import multer from "multer";
import { Router } from "express";
import {
	createProducts,
	deleteProducts,
	listProducts,
	updateProducts,
} from "../controller/ProductController";
import { ensureAuth } from "../middleware/AuthMiddlewate";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import { CloudinaryStorage } from "multer-storage-cloudinary";
dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME!,
	api_key: process.env.CLOUD_API_KEY!,
	api_secret: process.env.CLOUD_API_SECRET!,
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		public_id: () => `produto_${Date.now()}`, // gera um public_id único
	},
});

export const upload = multer({ storage });

export const productRouter = Router();

//list products
productRouter.get("/", ensureAuth, listProducts);

//create product
productRouter.post("/", upload.single("image"), ensureAuth, createProducts);

//delet products
productRouter.delete("/:productId", ensureAuth, deleteProducts);

productRouter.put(
	"/:productId",
	upload.single("image"),
	ensureAuth,
	updateProducts
);
