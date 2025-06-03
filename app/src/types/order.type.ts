import type { Product } from "./product.type";

export interface Order {
	id?: string;
	table: string;
	status: "WAITING" | "IN_PRODUCTION" | "DONE";
	createdAt: Date;
	products: { id?: string; product: Product; quantity: number }[];
	establishment: string;
	customerName: string;
	canceled: boolean;
}
