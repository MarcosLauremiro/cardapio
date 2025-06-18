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
			type: String, // formato "HH:mm", ex: "08:30"
			required: true,
			validate: {
				validator: (v: string) => /^\d{2}:\d{2}$/.test(v),
				message: (props: { value: string }) =>
					`${props.value} não está num formato HH:mm válido`,
			},
		},
		fechamento: {
			type: String, // formato "HH:mm", ex: "18:00"
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

const SubscriptionSchema = new Schema(
	{
		planId: {
			type: String,
			required: true,
		},
		planName: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["active", "inactive", "suspended", "canceled"],
			default: "inactive",
		},
		startDate: {
			type: Date,
		},
		endDate: {
			type: Date,
		},
		renewalDate: {
			type: Date,
		},
		price: {
			type: Number,
			required: true,
		},
		paymentMethod: {
			type: String,
			enum: ["credit_card", "debit_card", "pix", "bank_slip"],
		},
		autoRenewal: {
			type: Boolean,
			default: true,
		},
	},
	{ _id: false }
);

export const User = model(
	"User",
	new Schema(
		{
			name: {
				type: String,
				required: true,
				trim: true,
			},
			slug: {
				type: String,
				unique: true,
				lowercase: true,
			},
			description: {
				type: String,
				maxlength: 500,
			},
			category: {
				type: String,
			},

			// Horários de funcionamento
			schedule: {
				type: [ScheduleSchema],
				default: [],
			},

			// Dados de autenticação
			email: {
				type: String,
				required: true,
				unique: true,
				lowercase: true,
				trim: true,
			},
			password: {
				type: String,
				required: true,
			},
			emailVerified: {
				type: Boolean,
				default: false,
			},

			// Contato
			phone: {
				type: String,
				required: true,
			},
			whatsapp: {
				type: String,
			},
			website: {
				type: String,
			},

			// Endereço
			address: {
				street: {
					type: String,
				},
				number: {
					type: String,
				},
				complement: {
					type: String,
				},
				neighborhood: {
					type: String,
				},
				city: {
					type: String,
				},
				state: {
					type: String,
				},
				zipCode: {
					type: String,
				},
				coordinates: {
					latitude: Number,
					longitude: Number,
				},
			},

			// Informações comerciais
			cnpj: {
				type: String,
				unique: true,
				sparse: true,
			},
			cpf: {
				type: String,
				unique: true,
				sparse: true,
			},
			businessName: {
				type: String,
			},

			// Assinatura e pagamento
			subscription: {
				type: SubscriptionSchema,
			},
			billingInfo: {
				cardLastFour: String,
				cardBrand: String,
				holderName: String,
				billingAddress: {
					street: String,
					number: String,
					neighborhood: String,
					city: String,
					state: String,
					zipCode: String,
				},
			},

			// Status e configurações
			status: {
				type: String,
				enum: ["pending", "active", "suspended", "inactive"],
				default: "pending",
			},
			isApproved: {
				type: Boolean,
				default: false,
			},

			// Recursos e limites baseados no plano
			features: {
				maxProducts: {
					type: Number,
					default: 10,
				},
				maxPhotos: {
					type: Number,
					default: 5,
				},
				canAcceptOnlineOrders: {
					type: Boolean,
					default: false,
				},
				canUseAnalytics: {
					type: Boolean,
					default: false,
				},
				canCustomizeTheme: {
					type: Boolean,
					default: false,
				},
			},

			// Mídia
			logo: {
				type: String, // URL da imagem
			},
			coverImage: {
				type: String, // URL da imagem de capa
			},
			photos: [
				{
					url: String,
					alt: String,
					order: Number,
				},
			],

			// SEO e links
			socialMedia: {
				instagram: String,
				facebook: String,
				twitter: String,
			},

			// Configurações de delivery
			deliverySettings: {
				hasDelivery: {
					type: Boolean,
					default: false,
				},
				deliveryFee: {
					type: Number,
					default: 0,
				},
				minimumOrder: {
					type: Number,
					default: 0,
				},
				deliveryRadius: {
					type: Number, // em km
					default: 5,
				},
				estimatedTime: {
					type: String, // ex: "30-45 min"
				},
			},

			// Timestamps
			createdAt: {
				type: Date,
				default: Date.now,
			},
			updatedAt: {
				type: Date,
				default: Date.now,
			},
			lastLogin: {
				type: Date,
			},

			// Campos para link personalizado (mantendo compatibilidade)
			link: {
				type: String,
			},
		},
		{
			timestamps: true, // Adiciona automaticamente createdAt e updatedAt
		}
	)
);
