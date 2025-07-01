import type { User } from "./User";

export interface Subscription {
	Itens: string;
	Customer: User;
	Cnterval: string;
	Interval_Count: string;
	Paymet_method: string;
	Card: boolean;
	Start_At: string;
	Billing_Type: string;
	Installments: string;
}

// Interval: Semana, mês, ano...
// Interval_Count: 1, 2, 3, 4, 5 ...
// Isso quer dizer que se for selecionado mês e 3, a cobrança será feita a cada 3 meses (trimestral).
// Se não for selecionado o número de ciclos, automaticamente será entendido como uma assinatura com duração infinita.
