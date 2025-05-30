import { HttpError } from "../middleware/HttpError";
import { Establishment } from "../models/Establishment";
import { Order } from "../models/Order";
import { Product } from "../models/Product";
import { CreateOrderDTO } from "../types/express/types";

export async function createOrderService(dto: CreateOrderDTO) {
	const { customerName, table, products, establishmentId } = dto;

	if (!customerName.trim) {
		throw new HttpError(
			400,
			"Por favor, informe um nome para referência do pedido."
		);
	}

	if (!table?.trim()) {
		throw new HttpError(
			400,
			"Por favor, informe o número da mesa ou o endereço para entrega."
		);
	}

	if (!Array.isArray(products) || products.length === 0) {
		throw new HttpError(
			400,
			"Seu carrinho está vazio. Adicione itens antes de finalizar o pedido."
		);
	}

	const establishment = await Establishment.findById(establishmentId).lean();

	if (!establishment) {
		throw new HttpError(400, "Estabelecimento não encontrado.");
	}

	const now = new Date();
	const todaySlot = establishment.schedule.find(
		(s) => s.diaSemana === now.getDay()
	);
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
		itemsToSave.push({ product: product, quantity: quantity });
	}

	const order = await Order.create({
		customerName,
		table,
		products: itemsToSave,
		establishment: establishmentId,
	});

	return {
		id: order._id,
		status: order.status,
		mensagem: "Pedido realizado com sucesso!",
	};
}
