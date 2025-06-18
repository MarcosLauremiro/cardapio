import { model, Schema } from "mongoose";

export const Category = model(
	"Category",
	new Schema({
		name: {
			type: String,
			required: true,
			unique: true,
		},
		icon: {
			type: String,
			required: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			reg: "User",
		},
		isActive: {
			type: Boolean,
			default: true,
			required: true,
		},
	})
);
