import { model, Schema } from "mongoose";

const ScheduleSchema = new Schema(
	{
		diaSemana: {
			type: Number, // 0 = domingo, 1 = segunda, … 6 = sábado
			required: true,
			min: 0,
			max: 6,
		},
		abertura: {
			type: String, // formato “HH:mm”, ex: “08:30”
			required: true,
			validate: {
				validator: (v: string) => /^\d{2}:\d{2}$/.test(v),
				message: (props: { value: string }) =>
					`${props.value} não está num formato HH:mm válido`,
			},
		},
		fechamento: {
			type: String, // formato “HH:mm”, ex: “18:00”
			required: true,
			validate: {
				validator: (v: string) => /^\d{2}:\d{2}$/.test(v),
				message: (props: { value: string }) =>
					`${props.value} não está num formato HH:mm válido`,
			},
		},
		fechado: {
			type: Boolean, // opcional: se esse dia está fechado
			default: false,
		},
	},
	{ _id: false }
);

export const Establishment = model(
	"Establishment",
	new Schema({
		name: {
			type: String,
			required: true,
		},
		schedule: {
			type: [ScheduleSchema],
			default: [],
		},
		email: {
			type: String,
			required: true,
		},
		password: {
			type: String,
			required: true,
		},
		phone: {
			type: String,
			required: true,
		},
		neighborhood: {
			type: String,
		},
		road: {
			type: String,
		},
		city: {
			type: String,
		},
		state: {
			type: String,
		},
		number: {
			type: String,
		},
		link: {
			type: String,
		},
	})
);
