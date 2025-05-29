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

export interface CreateOrderDTO {
	establishmentId: string;
	table: string;
	products: { product: string; quantity: number }[];
	customerName: string;
	status?: "WAITING" | "IN_PRODUCTION" | "DONE";
}

export type DaySchedule = {
	diaSemana: number;
	abertura: string; // "HH:mm"
	fechamento: string; // "HH:mm"
	fechado?: boolean;
};
