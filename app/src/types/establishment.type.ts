export interface ScheduleItem {
	diaSemana: number;
	abertura: string;
	fechamento: string;
	fechado: boolean;
}

export interface EstablishmentType {
	_id: string;
	name: string;
	email: string;
	phone: string;
	neighborhood?: string;
	road?: string;
	city?: string;
	state?: string;
	number?: string;
	link?: string;
	plan: string;
	paymentDate: string;
	schedule: ScheduleItem[];
	createdAt: string;
}
