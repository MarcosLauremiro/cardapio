import { model, Schema } from "mongoose";

export const Order = model(
	"Order",
	new Schema({
		table: {
			type: String,
			required: false,
		},
		status: {
			type: String,
			enum: [
				"WAITING",
				"IN_PRODUCTION",
				"DONE",
				"OUT_FOR_DELIVERY",
				"DELIVERED",
			],
			default: "WAITING",
		},
		createdAt: {
			type: Date,
			default: Date.now,
		},
		products: {
			required: true,
			type: [
				{
					product: {
						type: Schema.Types.ObjectId,
						required: true,
						ref: "Product",
					},
					quantity: {
						type: Number,
						default: 1,
					},
				},
			],
		},
		establishment: {
			required: true,
			type: Schema.Types.ObjectId,
			ref: "Establishment",
		},
		customerName: {
			required: true,
			type: String,
		},
		customerPhone: {
			type: String,
		},
		canceled: {
			type: Boolean,
			default: false,
		},
		delivery: {
			isDelivery: {
				type: Boolean,
				default: false,
			},
			address: {
				street: { type: String },
				number: { type: String },
				complement: { type: String },
				neighborhood: { type: String },
				city: { type: String },
				state: { type: String },
				zipCode: { type: String },
			},
			deliveryFee: {
				type: Number,
				default: 0,
			},
			estimatedTime: {
				type: String,
			},
			deliveryPerson: {
				name: { type: String },
				phone: { type: String },
			},
		},
		payment: {
			method: {
				type: String,
				enum: ["CASH", "CREDIT_CARD", "DEBIT_CARD", "PIX"],
			},
			changeFor: {
				type: Number,
			},
			paid: {
				type: Boolean,
				default: false,
			},
		},
	})
);
