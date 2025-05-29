import { Request, Response } from "express";
import { Order } from "../models/Order";
import { createOrderService } from "../service/OrderService";

//listar pedidos
//GET /orders?page=2&perPage=20
export async function listOrder(req: Request, res: Response) {
	try {
		const page = Number(req.query.page) || 1;
		const perPage = Number(req.query.perPage) || 20;
		const establishmentId = res.locals.establishmentId;
		const orders = await Order.find({ establishment: establishmentId })
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
		const establishmentId = res.locals.establishmentId as string;
		const { table, products, customerName } = req.body;
		const result = await createOrderService({
			establishmentId,
			table,
			products,
			customerName,
		});
		res.status(201).json(result);
	} catch (error) {
		console.log(error);
		res.status(500);
	}
}

//Alterar status do pedido
export async function changeOrderStatus(req: Request, res: Response) {
	try {
		const { orderId } = req.params;
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
		await Order.findByIdAndDelete(orderId);
		res.sendStatus(204);
	} catch (error) {
		console.log(error);
		res.status(500);
	}
}
