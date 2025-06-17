import dotenv from "dotenv";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

dotenv.config();

cloudinary.config({
	cloud_name: process.env.CLOUD_NAME!,
	api_key: process.env.CLOUD_API_KEY!,
	api_secret: process.env.CLOUD_API_SECRET!,
});

const storage = new CloudinaryStorage({
	cloudinary,
	params: {
		public_id: () => `produto_${Date.now()}`,
	},
});

export const upload = multer({ storage });
