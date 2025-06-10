export interface Product {
	_id?: string;
	name?: string;
	description?: string;
	imagePath?: string;
	price?: number;
	ingredients: Ingredients[];
	category?: string;
	establishment?: string;
	active?: boolean;
}

export interface Pagination {
	currentPage: number;
	hasNextPage: boolean;
	hasPrevPage: boolean;
	itemsPerPage: number;
	totalItems: number;
	totalPages: number;
}

export interface Result {
	data: Product[];
	pagination: Pagination;
}

export interface Ingredients {
	name: string;
	icon: string;
}
