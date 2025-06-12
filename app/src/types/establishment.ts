// Tipos básicos
export type EstablishmentStatus =
	| "pending"
	| "active"
	| "suspended"
	| "inactive";
export type SubscriptionStatus =
	| "active"
	| "inactive"
	| "suspended"
	| "canceled";
export type PaymentMethod = "credit_card" | "debit_card" | "pix" | "bank_slip";
export type EstablishmentCategory =
	| "restaurant"
	| "bar"
	| "cafe"
	| "fast_food"
	| "pizzeria"
	| "bakery"
	| "other";

// Interface para horário de funcionamento
export interface Schedule {
	diaSemana: number; // 0 = domingo, 1 = segunda, … 6 = sábado
	abertura: string; // formato "HH:mm"
	fechamento: string; // formato "HH:mm"
	fechado: boolean;
}

// Interface para assinatura
export interface Subscription {
	planId: string;
	planName: string;
	status: SubscriptionStatus;
	startDate?: Date;
	endDate?: Date;
	renewalDate?: Date;
	price: number;
	paymentMethod?: PaymentMethod;
	autoRenewal: boolean;
}

// Interface para endereço
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

// Interface para informações de cobrança
export interface BillingInfo {
	cardLastFour?: string;
	cardBrand?: string;
	holderName?: string;
	billingAddress?: {
		street?: string;
		number?: string;
		neighborhood?: string;
		city?: string;
		state?: string;
		zipCode?: string;
	};
}

// Interface para recursos/funcionalidades
export interface EstablishmentFeatures {
	maxProducts: number;
	maxPhotos: number;
	canAcceptOnlineOrders: boolean;
	canUseAnalytics: boolean;
	canCustomizeTheme: boolean;
}

// Interface para foto
export interface Photo {
	url: string;
	alt?: string;
	order?: number;
}

// Interface para redes sociais
export interface SocialMedia {
	instagram?: string;
	facebook?: string;
	twitter?: string;
}

// Interface para configurações de delivery
export interface DeliverySettings {
	hasDelivery: boolean;
	deliveryFee: number;
	minimumOrder: number;
	deliveryRadius: number; // em km
	estimatedTime?: string; // ex: "30-45 min"
}

export interface Establishment {
	_id?: string;
	name: string;
	slug?: string;
	description?: string;
	category?: EstablishmentCategory;
	schedule?: Schedule[];
	email: string;
	emailVerified?: boolean;
	phone: string;
	whatsapp?: string;
	website?: string;
	address?: Address;
	cnpj?: string;
	cpf?: string;
	businessName?: string;
	subscription?: Subscription;
	billingInfo?: BillingInfo;
	status?: EstablishmentStatus;
	isApproved?: boolean;
	features?: EstablishmentFeatures;
	logo?: string;
	coverImage?: string;
	photos?: Photo[];
	socialMedia?: SocialMedia;
	deliverySettings?: DeliverySettings;
	createdAt?: Date;
	updatedAt?: Date;
	lastLogin?: Date;
	link?: string;
	neighborhood?: string;
	road?: string;
	city?: string;
	state?: string;
	number?: string;
}

// Interface para registro (dados mínimos)
export interface EstablishmentRegister {
	name: string;
	email: string;
	phone: string;
	password: string;
}

export interface AuthResponse {
	token: string;
	establishment: Establishment;
}

export interface Login {
	email: string;
	password: string;
}

// Interface para login
export interface EstablishmentLogin {
	email: string;
	password: string;
}

// Interface para atualização de perfil (campos opcionais)
export interface EstablishmentUpdate {
	name?: string;
	description?: string;
	category?: EstablishmentCategory;
	schedule?: Schedule[];
	phone?: string;
	whatsapp?: string;
	website?: string;
	address?: Partial<Address>;
	cnpj?: string;
	cpf?: string;
	businessName?: string;
	logo?: string;
	coverImage?: string;
	photos?: Photo[];
	socialMedia?: Partial<SocialMedia>;
	deliverySettings?: Partial<DeliverySettings>;
	link?: string;
}

// Interface para atualização de senha
export interface PasswordUpdate {
	currentPassword: string;
	newPassword: string;
}

// Interface para resposta da API
export interface EstablishmentResponse {
	message: string;
	establishment: Establishment;
	token?: string;
}

// Interface para resposta de lista
export interface EstablishmentListResponse {
	message: string;
	establishments: Establishment[];
	total: number;
	page: number;
	limit: number;
}

// Interface para filtros de busca
export interface EstablishmentFilters {
	name?: string;
	category?: EstablishmentCategory;
	status?: EstablishmentStatus;
	city?: string;
	state?: string;
	hasDelivery?: boolean;
	isApproved?: boolean;
	page?: number;
	limit?: number;
}

// Interface para dados públicos (sem informações sensíveis)
export interface PublicEstablishment {
	_id: string;
	name: string;
	slug?: string;
	description?: string;
	category?: EstablishmentCategory;
	schedule: Schedule[];
	phone: string;
	whatsapp?: string;
	website?: string;
	address?: Address;
	logo?: string;
	coverImage?: string;
	photos: Photo[];
	socialMedia?: SocialMedia;
	deliverySettings?: DeliverySettings;
	isApproved: boolean;
	createdAt: Date;
	link?: string;
}

// Tipos para forms
export type EstablishmentFormData = EstablishmentRegister | EstablishmentUpdate;

// Tipos para validação
export interface EstablishmentValidation {
	isValid: boolean;
	errors: {
		[key: string]: string;
	};
}

// Constantes úteis
export const ESTABLISHMENT_CATEGORIES = [
	{ value: "restaurant", label: "Restaurante" },
	{ value: "bar", label: "Bar" },
	{ value: "cafe", label: "Café" },
	{ value: "fast_food", label: "Fast Food" },
	{ value: "pizzeria", label: "Pizzaria" },
	{ value: "bakery", label: "Padaria" },
	{ value: "other", label: "Outro" },
] as const;

export const PAYMENT_METHODS = [
	{ value: "credit_card", label: "Cartão de Crédito" },
	{ value: "debit_card", label: "Cartão de Débito" },
	{ value: "pix", label: "PIX" },
	{ value: "bank_slip", label: "Boleto" },
] as const;

export const DAYS_OF_WEEK = [
	{ value: 0, label: "Domingo" },
	{ value: 1, label: "Segunda-feira" },
	{ value: 2, label: "Terça-feira" },
	{ value: 3, label: "Quarta-feira" },
	{ value: 4, label: "Quinta-feira" },
	{ value: 5, label: "Sexta-feira" },
	{ value: 6, label: "Sábado" },
] as const;
