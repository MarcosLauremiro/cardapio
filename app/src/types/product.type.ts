export interface Product {
	id?: string;
	name?: string;
	description?: string;
	imagePath?: string;
	price?: number;
	ingredients: Ingredients[];
	category?: string;
	establishment?: string;
	active?: boolean;
}

export interface Ingredients {
	name: string;
	icon: string;
}
