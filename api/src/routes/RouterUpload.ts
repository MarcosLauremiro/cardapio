import { Router } from "express";
import { upload } from "../controller/UploadController";

export const uploadRouter = Router();

uploadRouter.post("/", upload.single("image"));

export function sum(a: number, b: number) {
	return a + b;
}
