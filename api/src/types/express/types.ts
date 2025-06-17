export interface ProductDto {
	name: string;
	description: string;
	imagePath: string;
	price: number;
	ingredients: Ingredients[];
	category: string;
	establishment: string;
	active?: boolean;
}

export interface Ingredients {
	name: string;
	icon: string;
}

interface Address {
	street: string;
	number: string;
	complement: string;
	neighborhood: string;
	city: string;
	state: string;
	zipCode: string;
}

export interface CreateOrderDTO {
	establishmentId: string;
	table: string;
	products: { product: string; quantity: number }[];
	customerName: string;
	status?:
		| "WAITING"
		| "IN_PRODUCTION"
		| "DONE"
		| "OUT_FOR_DELIVERY"
		| "DELIVERED";
	delivery: {
		isDelivery: boolean;
		address: Address;
		deliveryFee: number;
		estimatedTime: string;
		deliveryPerson: { name: string; phone: string };
	};
	payment: "CASH" | "CREDIT_CARD" | "DEBIT_CARD" | "PIX";
	customerPhone: string;
}

export type DaySchedule = {
	diaSemana: number;
	abertura: string; // "HH:mm"
	fechamento: string; // "HH:mm"
	fechado?: boolean;
};

export interface CreateCategoryDto {
	name: string;
	icon: string;
	isActive: boolean;
	establishmentId: string;
}
