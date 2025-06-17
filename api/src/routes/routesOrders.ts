import { Router } from "express";
import {
	createOrder,
	listOrder,
	changeOrderStatus,
	cancelOrder,
} from "../controller/OrderController";
import {
	ensureAuth,
	verifyIdEstablishment,
} from "../middleware/authMiddlewate";

export const routerOrders = Router();

//List orders
/**
 * @swagger
 * /orders:
 *   get:
 *     tags:
 *       - Pedidos
 *     summary: Listar todos os pedidos
 *     description: Retorna todos os pedidos do estabelecimento autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pedidos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   table:
 *                     type: string
 *                   status:
 *                     type: string
 *                     enum:
 *                       - WAITING
 *                       - IN_PRODUCTION
 *                       - DONE
 *                       - OUT_FOR_DELIVERY
 *                       - DELIVERED
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         product:
 *                           type: string
 *                         quantity:
 *                           type: number
 *                   establishment:
 *                     type: string
 *                   customerName:
 *                     type: string
 *                   customerPhone:
 *                     type: string
 *                   canceled:
 *                     type: boolean
 *                   delivery:
 *                     type: object
 *                     properties:
 *                       isDelivery:
 *                         type: boolean
 *                       address:
 *                         type: object
 *                         properties:
 *                           street:
 *                             type: string
 *                           number:
 *                             type: string
 *                           complement:
 *                             type: string
 *                           neighborhood:
 *                             type: string
 *                           city:
 *                             type: string
 *                           state:
 *                             type: string
 *                           zipCode:
 *                             type: string
 *                       deliveryFee:
 *                         type: number
 *                       estimatedTime:
 *                         type: string
 *                       deliveryPerson:
 *                         type: object
 *                         properties:
 *                           name:
 *                             type: string
 *                           phone:
 *                             type: string
 *                   payment:
 *                     type: object
 *                     properties:
 *                       method:
 *                         type: string
 *                         enum:
 *                           - CASH
 *                           - CREDIT_CARD
 *                           - DEBIT_CARD
 *                           - PIX
 *                       changeFor:
 *                         type: number
 *                       paid:
 *                         type: boolean
 */
routerOrders.get("/", ensureAuth, listOrder);

//create order
/**
 * @swagger
 * /orders:
 *   post:
 *     tags:
 *       - Pedidos
 *     summary: Criar um novo pedido
 *     description: Cria um novo pedido vinculado a um estabelecimento
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - products
 *               - establishment
 *               - customerName
 *             properties:
 *               table:
 *                 type: string
 *               products:
 *                 type: array
 *                 items:
 *                   type: object
 *                   required:
 *                     - product
 *                   properties:
 *                     product:
 *                       type: string
 *                       description: ID do produto
 *                     quantity:
 *                       type: number
 *                       default: 1
 *               establishment:
 *                 type: string
 *                 description: ID do estabelecimento
 *               customerName:
 *                 type: string
 *               customerPhone:
 *                 type: string
 *               delivery:
 *                 type: object
 *                 properties:
 *                   isDelivery:
 *                     type: boolean
 *                   address:
 *                     type: object
 *                     properties:
 *                       street:
 *                         type: string
 *                       number:
 *                         type: string
 *                       complement:
 *                         type: string
 *                       neighborhood:
 *                         type: string
 *                       city:
 *                         type: string
 *                       state:
 *                         type: string
 *                       zipCode:
 *                         type: string
 *                   deliveryFee:
 *                     type: number
 *                   estimatedTime:
 *                     type: string
 *                   deliveryPerson:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                       phone:
 *                         type: string
 *               payment:
 *                 type: object
 *                 properties:
 *                   method:
 *                     type: string
 *                     enum:
 *                       - CASH
 *                       - CREDIT_CARD
 *                       - DEBIT_CARD
 *                       - PIX
 *                   changeFor:
 *                     type: number
 *                   paid:
 *                     type: boolean
 *     responses:
 *       201:
 *         description: Pedido criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 table:
 *                   type: string
 *                 status:
 *                   type: string
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       product:
 *                         type: string
 *                       quantity:
 *                         type: number
 *                 establishmentId:
 *                   type: string
 *                 customerName:
 *                   type: string
 *                 customerPhone:
 *                   type: string
 *                 canceled:
 *                   type: boolean
 *                 delivery:
 *                   type: object
 *                   properties:
 *                     isDelivery:
 *                       type: boolean
 *                     address:
 *                       type: object
 *                       properties:
 *                         street:
 *                           type: string
 *                         number:
 *                           type: string
 *                         complement:
 *                           type: string
 *                         neighborhood:
 *                           type: string
 *                         city:
 *                           type: string
 *                         state:
 *                           type: string
 *                         zipCode:
 *                           type: string
 *                     deliveryFee:
 *                       type: number
 *                     estimatedTime:
 *                       type: string
 *                     deliveryPerson:
 *                       type: object
 *                       properties:
 *                         name:
 *                           type: string
 *                         phone:
 *                           type: string
 *                 payment:
 *                   type: object
 *                   properties:
 *                     method:
 *                       type: string
 *                     changeFor:
 *                       type: number
 *                     paid:
 *                       type: boolean
 *       400:
 *         description: Erro na criação do pedido (validação ou dados inválidos)
 */
routerOrders.post("/", verifyIdEstablishment, createOrder);

//change order status
/**
 * @swagger
 * /orders/{orderId}:
 *   patch:
 *     tags:
 *       - Pedidos
 *     summary: Atualizar o status de um pedido
 *     description: Altera o status de um pedido específico pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido a ser atualizado
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - WAITING
 *                   - IN_PRODUCTION
 *                   - DONE
 *                   - OUT_FOR_DELIVERY
 *                   - DELIVERED
 *     responses:
 *       200:
 *         description: Status do pedido atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 status:
 *                   type: string
 *                 message:
 *                   type: string
 *                   example: Status atualizado com sucesso
 *       404:
 *         description: Pedido não encontrado
 */
routerOrders.patch("/:orderId", ensureAuth, changeOrderStatus);

//delete/cal order
/**
 * @swagger
 * /orders/{orderId}:
 *   delete:
 *     tags:
 *       - Pedidos
 *     summary: Cancelar um pedido
 *     description: Cancela um pedido existente a partir do seu ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: orderId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do pedido a ser cancelado
 *     responses:
 *       200:
 *         description: Pedido cancelado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Pedido cancelado com sucesso
 *       404:
 *         description: Pedido não encontrado
 */
routerOrders.delete("/:orderId", ensureAuth, cancelOrder);
