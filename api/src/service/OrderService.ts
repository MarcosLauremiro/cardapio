import { HttpError } from "../middleware/HttpError";
import { User } from "../models/User";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { CreateOrderDTO } from "../types/express/types";

export async function createOrderService(dto: CreateOrderDTO) {
	const {
		customerName,
		table,
		products,
		userId,
		delivery,
		payment,
		customerPhone,
	} = dto;

	if (!customerName?.trim()) {
		throw new HttpError(
			400,
			"Por favor, informe um nome para referência do pedido."
		);
	}

	if (!Array.isArray(products) || products.length === 0) {
		throw new HttpError(
			400,
			"Seu carrinho está vazio. Adicione itens antes de finalizar o pedido."
		);
	}

	// Se for delivery, exige endereço
	if (delivery?.isDelivery) {
		const { address } = delivery;
		if (
			!address?.street ||
			!address?.number ||
			!address?.neighborhood ||
			!address?.city
		) {
			throw new HttpError(
				400,
				"Por favor, preencha todas as informações de endereço para entrega."
			);
		}
	} else {
		if (!table?.trim()) {
			throw new HttpError(
				400,
				"Por favor, informe o número da mesa ou marque como entrega."
			);
		}
	}

	const user = await User.findById(userId).lean();

	if (!user) {
		throw new HttpError(400, "Estabelecimento não encontrado.");
	}

	const now = new Date();
	const todaySlot = user.schedule.find((s) => s.diaSemana === now.getDay());

	if (!todaySlot || todaySlot.fechado) {
		throw new HttpError(
			400,
			"Desculpe, o estabelecimento encontra-se fechado no momento e não está aceitando pedidos."
		);
	}

	const toMins = (hhmm: string) => {
		const [h, m] = hhmm.split(":").map(Number);
		return h * 60 + m;
	};

	const mins = now.getHours() * 60 + now.getMinutes();

	if (
		mins < toMins(todaySlot.abertura) ||
		mins >= toMins(todaySlot.fechamento)
	) {
		throw new HttpError(
			400,
			"Desculpe, o estabelecimento encontra-se fechado no momento e não está aceitando pedidos."
		);
	}

	const itemsToSave: { product: string; quantity: number }[] = [];
	for (const { product, quantity } of products) {
		if (!Number.isInteger(quantity) || quantity < 1) {
			throw new HttpError(
				400,
				`A quantidade para o produto ${product} deve ser pelo menos 1.`
			);
		}

		const prod = await Product.findById(product).lean();
		if (!prod || prod.active === false) {
			throw new HttpError(
				400,
				"Um ou mais itens do seu pedido não estão disponíveis ou não existem."
			);
		}

		itemsToSave.push({ product, quantity });
	}

	const order = await Order.create({
		customerName,
		customerPhone,
		table: delivery?.isDelivery ? undefined : table,
		products: itemsToSave,
		userId: userId,
		delivery: delivery?.isDelivery ? delivery : { isDelivery: false },
		payment: payment || {},
	});

	return order;
}
