import type { Product } from "./product.type";
import type { Address } from "./User";

export interface Order {
	id?: string;
	table: string;
	status:
		| "WAITING"
		| "IN_PRODUCTION"
		| "DONE"
		| "OUT_FOR_DELIVERY"
		| "DELIVERED";
	createdAt: Date;
	products: { product: Product; quantity: number }[];
	userId: string;
	customerName: string;
	customerPhone: string;
	delivery: Delivery;
	canceled: boolean;
	oderNumber: number;
}

interface Delivery {
	isDelivery: boolean;
	address: Address;
	deliveryFee: number;
	estimatedTime: string;
}
