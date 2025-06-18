import { Request, Response } from "express";
import { User } from "../models/User";
import { setScheduleService } from "../service/UserService";

export async function findUser(req: Request, res: Response) {
	try {
		const userId = res.locals.userId;
		if (!userId) {
			res.status(401).json({ message: "Não autenticado" });
		}

		const user = await User.findById(userId).select("-password");

		if (!user) {
			res.status(404).json({ message: "Estabelecimento Não encontrado" });
		}

		res.json(user);
	} catch (error) {
		console.log("Erro ao buscar usuário", error);
		res.status(500).json({ message: "Error interno no servidor" });
	}
}

export async function setSchedule(req: Request, res: Response) {
	try {
		const userId = res.locals.userId as string;
		const schedule = req.body.schedule;

		const updated = await setScheduleService(userId, schedule);

		res.json(updated);
	} catch (error) {
		console.log("Erro ao alterar Horarios", error);
		res.status(500).json({ message: "Erro interno ao atualizar horário." });
	}
}

export async function updateBasicInfo(req: Request, res: Response) {
	try {
		const userId = res.locals.userId as string;
		if (!userId) {
			res.status(401).json({ message: "Não autenticado" });
		}

		const { name, description, category, website, whatsapp } = req.body;

		const user = await User.findByIdAndUpdate(
			userId,
			{
				name,
				description,
				category,
				website,
				whatsapp,
				updatedAt: new Date(),
			},
			{ new: true, runValidators: true }
		).select("-password");

		if (!user) {
			res.status(404).json({ message: "Estabelecimento não encontrado" });
		}

		res.json(user);
	} catch (error) {
		console.log("Erro ao atualizar informações básicas", error);
		res.status(500).json({ message: "Erro interno do servidor" });
	}
}

export async function updateAddress(req: Request, res: Response) {
	try {
		const userId = res.locals.userId as string;
		if (!userId) {
			res.status(401).json({ message: "Não autenticado" });
		}

		const {
			street,
			number,
			complement,
			neighborhood,
			city,
			state,
			zipCode,
			coordinates,
		} = req.body;

		const user = await User.findByIdAndUpdate(
			userId,
			{
				"address.street": street,
				"address.number": number,
				"address.complement": complement,
				"address.neighborhood": neighborhood,
				"address.city": city,
				"address.state": state,
				"address.zipCode": zipCode,
				"address.coordinates": coordinates,
				updatedAt: new Date(),
			},
			{ new: true, runValidators: true }
		).select("-password");

		if (!user) {
			res.status(404).json({ message: "Estabelecimento não encontrado" });
		}

		res.json(user);
	} catch (error) {
		console.log("Erro ao atualizar endereço", error);
		res.status(500).json({ message: "Erro interno do servidor" });
	}
}

export async function updateBusinessInfo(req: Request, res: Response) {
	try {
		const userId = res.locals.userId as string;
		if (!userId) {
			res.status(401).json({ message: "Não autenticado" });
		}

		const { cnpj, cpf, businessName } = req.body;

		const user = await User.findByIdAndUpdate(
			userId,
			{
				cnpj,
				cpf,
				businessName,
				updatedAt: new Date(),
			},
			{ new: true, runValidators: true }
		).select("-password");

		if (!user) {
			res.status(404).json({ message: "Estabelecimento não encontrado" });
		}

		res.json(user);
	} catch (error) {
		console.log("Erro ao atualizar informações comerciais", error);
		res.status(500).json({ message: "Erro interno do servidor" });
	}
}

export async function updateDeliverySettings(req: Request, res: Response) {
	try {
		const userId = res.locals.userId as string;
		if (!userId) {
			res.status(401).json({ message: "Não autenticado" });
		}

		const {
			hasDelivery,
			deliveryFee,
			minimumOrder,
			deliveryRadius,
			estimatedTime,
		} = req.body;

		const user = await User.findByIdAndUpdate(
			userId,
			{
				"deliverySettings.hasDelivery": hasDelivery,
				"deliverySettings.deliveryFee": deliveryFee,
				"deliverySettings.minimumOrder": minimumOrder,
				"deliverySettings.deliveryRadius": deliveryRadius,
				"deliverySettings.estimatedTime": estimatedTime,
				updatedAt: new Date(),
			},
			{ new: true, runValidators: true }
		).select("-password");

		if (!user) {
			res.status(404).json({ message: "Estabelecimento não encontrado" });
		}

		res.json(user);
	} catch (error) {
		console.log("Erro ao atualizar configurações de delivery", error);
		res.status(500).json({ message: "Erro interno do servidor" });
	}
}

export async function updateSocialMedia(req: Request, res: Response) {
	try {
		const userId = res.locals.userId as string;
		if (!userId) {
			res.status(401).json({ message: "Não autenticado" });
		}

		const { instagram, facebook, twitter } = req.body;

		const user = await User.findByIdAndUpdate(
			userId,
			{
				"socialMedia.instagram": instagram,
				"socialMedia.facebook": facebook,
				"socialMedia.twitter": twitter,
				updatedAt: new Date(),
			},
			{ new: true, runValidators: true }
		).select("-password");

		if (!user) {
			res.status(404).json({ message: "Estabelecimento não encontrado" });
		}

		res.json(user);
	} catch (error) {
		console.log("Erro ao atualizar redes sociais", error);
		res.status(500).json({ message: "Erro interno do servidor" });
	}
}

export async function updateMedia(req: Request, res: Response) {
	try {
		const userId = res.locals.userId as string;
		if (!userId) {
			res.status(401).json({ message: "Não autenticado" });
		}

		const { logo, coverImage, photos } = req.body;

		const user = await User.findByIdAndUpdate(
			userId,
			{
				logo,
				coverImage,
				photos,
				updatedAt: new Date(),
			},
			{ new: true, runValidators: true }
		).select("-password");

		if (!user) {
			res.status(404).json({ message: "Estabelecimento não encontrado" });
		}

		res.json(user);
	} catch (error) {
		console.log("Erro ao atualizar mídia", error);
		res.status(500).json({ message: "Erro interno do servidor" });
	}
}

export async function updateBillingInfo(req: Request, res: Response) {
	try {
		const userId = res.locals.userId as string;
		if (!userId) {
			res.status(401).json({ message: "Não autenticado" });
		}

		const { cardLastFour, cardBrand, holderName, billingAddress } = req.body;

		const user = await User.findByIdAndUpdate(
			userId,
			{
				"billingInfo.cardLastFour": cardLastFour,
				"billingInfo.cardBrand": cardBrand,
				"billingInfo.holderName": holderName,
				"billingInfo.billingAddress": billingAddress,
				updatedAt: new Date(),
			},
			{ new: true, runValidators: true }
		).select("-password");

		if (!user) {
			res.status(404).json({ message: "Estabelecimento não encontrado" });
		}

		res.json(user);
	} catch (error) {
		console.log("Erro ao atualizar informações de cobrança", error);
		res.status(500).json({ message: "Erro interno do servidor" });
	}
}

export async function updateSubscription(req: Request, res: Response) {
	try {
		const userId = res.locals.userId as string;
		if (!userId) {
			res.status(401).json({ message: "Não autenticado" });
		}

		const {
			planId,
			planName,
			status,
			startDate,
			endDate,
			renewalDate,
			price,
			paymentMethod,
			autoRenewal,
		} = req.body;

		const user = await User.findByIdAndUpdate(
			userId,
			{
				"subscription.planId": planId,
				"subscription.planName": planName,
				"subscription.status": status,
				"subscription.startDate": startDate,
				"subscription.endDate": endDate,
				"subscription.renewalDate": renewalDate,
				"subscription.price": price,
				"subscription.paymentMethod": paymentMethod,
				"subscription.autoRenewal": autoRenewal,
				updatedAt: new Date(),
			},
			{ new: true, runValidators: true }
		).select("-password");

		if (!user) {
			res.status(404).json({ message: "Estabelecimento não encontrado" });
		}

		res.json(user);
	} catch (error) {
		console.log("Erro ao atualizar assinatura", error);
		res.status(500).json({ message: "Erro interno do servidor" });
	}
}

export async function updateFeatures(req: Request, res: Response) {
	try {
		const userId = res.locals.userId as string;
		if (!userId) {
			res.status(401).json({ message: "Não autenticado" });
		}

		const {
			maxProducts,
			maxPhotos,
			canAcceptOnlineOrders,
			canUseAnalytics,
			canCustomizeTheme,
		} = req.body;

		const user = await User.findByIdAndUpdate(
			userId,
			{
				"features.maxProducts": maxProducts,
				"features.maxPhotos": maxPhotos,
				"features.canAcceptOnlineOrders": canAcceptOnlineOrders,
				"features.canUseAnalytics": canUseAnalytics,
				"features.canCustomizeTheme": canCustomizeTheme,
				updatedAt: new Date(),
			},
			{ new: true, runValidators: true }
		).select("-password");

		if (!user) {
			res.status(404).json({ message: "Estabelecimento não encontrado" });
		}

		res.json(user);
	} catch (error) {
		console.log("Erro ao atualizar recursos", error);
		res.status(500).json({ message: "Erro interno do servidor" });
	}
}

export async function updateStatus(req: Request, res: Response) {
	try {
		const userId = res.locals.userId as string;
		if (!userId) {
			res.status(401).json({ message: "Não autenticado" });
		}

		const { status, isApproved } = req.body;

		const user = await User.findByIdAndUpdate(
			userId,
			{
				status,
				isApproved,
				updatedAt: new Date(),
			},
			{ new: true, runValidators: true }
		).select("-password");

		if (!user) {
			res.status(404).json({ message: "Estabelecimento não encontrado" });
		}

		res.json(user);
	} catch (error) {
		console.log("Erro ao atualizar status", error);
		res.status(500).json({ message: "Erro interno do servidor" });
	}
}

export async function updateLastLogin(req: Request, res: Response) {
	try {
		const userId = res.locals.userId as string;
		if (!userId) {
			res.status(401).json({ message: "Não autenticado" });
		}

		const user = await User.findByIdAndUpdate(
			userId,
			{
				lastLogin: new Date(),
				updatedAt: new Date(),
			},
			{ new: true, runValidators: true }
		).select("-password");

		if (!user) {
			res.status(404).json({ message: "Estabelecimento não encontrado" });
		}

		res.json({ message: "Último login atualizado com sucesso" });
	} catch (error) {
		console.log("Erro ao atualizar último login", error);
		res.status(500).json({ message: "Erro interno do servidor" });
	}
}
