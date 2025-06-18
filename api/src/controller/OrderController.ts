import { Request, Response } from "express";
import { Order } from "../models/Order";
import { createOrderService } from "../service/OrderService";
import { HttpError } from "../middleware/HttpError";
import { wsClients } from "../config/websocket";

//listar pedidos
//GET /orders?page=2&perPage=20
export async function listOrder(req: Request, res: Response) {
	try {
		const page = Number(req.query.page) || 1;
		const perPage = Number(req.query.perPage) || 20;
		const userId = res.locals.userId;
		const orders = await Order.find({ userId: userId })
			.skip((page - 1) * perPage)
			.limit(perPage)
			.sort({ createdAt: 1 })
			.populate("products.product");
		res.json(orders);
	} catch (error) {
		console.log(error);
		res.status(500);
	}
}

//criar pedido
export async function createOrder(req: Request, res: Response) {
	try {
		const {
			userId,
			table,
			products,
			customerName,
			delivery,
			payment,
			customerPhone,
		} = req.body;

		const newOrderDoc = await createOrderService({
			userId,
			table,
			products,
			customerName,
			delivery,
			payment,
			customerPhone,
		});

		const payload = {
			type: "NEW_ORDER",
			data: newOrderDoc,
		};

		const sockets = wsClients.get(userId);
		if (sockets) {
			const message = JSON.stringify(payload);
			for (const clientSocket of sockets) {
				if (clientSocket.readyState === WebSocket.OPEN) {
					clientSocket.send(message);
				}
			}
		}

		res.status(201).json({
			id: newOrderDoc._id,
			status: newOrderDoc.status,
			mensagem: "Pedido realizado com sucesso!",
		});
	} catch (error) {
		console.error("Erro ao criar pedido:", error);
		new HttpError(500, "Erro ao criar pedido");
	}
}

//Alterar status do pedido
export async function changeOrderStatus(req: Request, res: Response) {
	try {
		const { orderId } = req.params;
		if (!orderId) {
			throw new HttpError(400, "Peidido não encontrado ou não existe");
		}

		const { status } = req.body;
		if (!["WAITING", "IN_PRODUCTION", "DONE"].includes(status)) {
			res.status(400).json({
				error:
					'Status shoud be one of these "WAITING", "IN_PRODUCTION", "DONE"',
			});
		}
		await Order.findByIdAndUpdate(orderId, { status });

		res.sendStatus(204);
	} catch (error) {
		console.log(error);
		res.status(500);
	}
}

export async function cancelOrder(req: Request, res: Response) {
	try {
		const { orderId } = req.params;
		if (!orderId) {
			throw new HttpError(400, "Peidido não encontrado ou não existe");
		}

		await Order.findByIdAndUpdate(orderId, { canceled: true });
		res.sendStatus(204);
	} catch (error) {
		console.log(error);
		res.status(500);
	}
}
