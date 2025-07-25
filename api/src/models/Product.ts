import { model, Schema } from "mongoose";

export const Product = model(
	"Product",
	new Schema({
		name: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		imagePath: {
			type: String,
			required: true,
		},
		price: {
			type: Number,
			required: true,
		},
		ingredients: {
			requered: true,
			type: [
				{
					name: {
						type: String,
						required: true,
					},
					icon: {
						type: String,
						required: true,
					},
				},
			],
		},
		category: {
			type: Schema.Types.ObjectId,
			required: true,
			reg: "Category",
		},
		userId: {
			type: Schema.Types.ObjectId,
			required: true,
			reg: "User",
		},
		active: {
			type: Boolean,
			required: true,
			default: true,
		},
	})
);
