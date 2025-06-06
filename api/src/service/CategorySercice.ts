import { HttpError } from "../middleware/HttpError";
import { Category } from "../models/Category";
import { CreateCategoryDto } from "../types/express/types";

export const createCategoryService = async (dto: CreateCategoryDto) => {
	const { name, icon, establishmentId, isActive = true } = dto;

	const nameExists = await Category.findOne({ name: name });

	if (nameExists) {
		throw new HttpError(400, "Essa categoria já existe.");
	}

	const category = await Category.create({
		icon,
		name,
		establishment: establishmentId,
		isActive,
	});

	return category;
};
