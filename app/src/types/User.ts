export interface Schedule {
	dayWeek: number; // 0 = domingo, 1 = segunda, … 6 = sábado
	opening: string; // formato "HH:mm"
	closed: string; // formato "HH:mm"
	close: boolean;
}
export interface Address {
	street: string;
	number: string;
	complement?: string;
	neighborhood: string;
	city: string;
	state: string;
	zipCode?: string;
	coordinates?: {
		latitude: number;
		longitude: number;
	};
}
export interface InfoAccount {
	phone: string;
	cnpj: string;
	cpf: string;
	description: string;
	delivery: boolean;
}
export interface SocialMedia {
	instagram?: string;
	facebook?: string;
	twitter?: string;
}
export interface DeliverySettings {
	hasDelivery: boolean;
	deliveryFee: number;
	minimumOrder: number;
	deliveryRadius: number; // em km
	estimatedTime?: string; // ex: "30-45 min"
}

export interface User {
	_id?: string;
	name: string;
	description?: string;
	schedule?: Schedule[];
	email: string;
	phone: string;
	website?: string;
	address?: Address;
	cnpj?: string;
	cpf?: string;
	status?: "pending" | "active" | "suspended" | "inactive";
	coverImage?: string;
	createdAt?: Date;
	updatedAt?: Date;
	lastLogin?: Date;
	waiter: [{ name: string }];
	link?: string;
}
export interface UserRegister {
	name: string;
	email: string;
	password: string;
}
export interface AuthResponse {
	token: string;
	user: User;
}
export interface Login {
	email: string;
	password: string;
}
