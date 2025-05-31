import { Router } from "express";
import {
	createOrder,
	listOrder,
	changeOrderStatus,
	cancelOrder,
} from "../controller/OrderController";
import { ensureAuth } from "../middleware/authMiddlewate";

export const routerOrders = Router();

//List orders
routerOrders.get("/", ensureAuth, listOrder);

//create order
routerOrders.post("/", createOrder);

//change order status
routerOrders.patch("/:orderId",  changeOrderStatus);

//delete/cal order
routerOrders.delete("/:orderId", cancelOrder);
