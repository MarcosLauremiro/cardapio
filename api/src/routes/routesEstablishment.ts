import { Router } from "express";
import { ensureAuth } from "../middleware/authMiddlewate";
import {
	findEstablishment,
	setSchedule,
	updateBasicInfo,
	updateAddress,
	updateBusinessInfo,
	updateDeliverySettings,
	updateSocialMedia,
	updateMedia,
	updateBillingInfo,
	updateSubscription,
	updateFeatures,
	updateStatus,
	updateLastLogin,
} from "../controller/EstablishmentController";

export const establishmentRoutes = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Schedule:
 *       type: object
 *       properties:
 *         diaSemana:
 *           type: integer
 *           minimum: 0
 *           maximum: 6
 *           description: Dia da semana (0=domingo, 1=segunda, ..., 6=sábado)
 *         abertura:
 *           type: string
 *           pattern: "^\\d{2}:\\d{2}$"
 *           example: "08:30"
 *           description: Horário de abertura no formato HH:mm
 *         fechamento:
 *           type: string
 *           pattern: "^\\d{2}:\\d{2}$"
 *           example: "18:00"
 *           description: Horário de fechamento no formato HH:mm
 *         fechado:
 *           type: boolean
 *           default: false
 *           description: Se o estabelecimento está fechado neste dia
 *
 *     Address:
 *       type: object
 *       properties:
 *         street:
 *           type: string
 *           description: Nome da rua
 *         number:
 *           type: string
 *           description: Número do endereço
 *         complement:
 *           type: string
 *           description: Complemento do endereço
 *         neighborhood:
 *           type: string
 *           description: Bairro
 *         city:
 *           type: string
 *           description: Cidade
 *         state:
 *           type: string
 *           description: Estado
 *         zipCode:
 *           type: string
 *           description: CEP
 *         coordinates:
 *           type: object
 *           properties:
 *             latitude:
 *               type: number
 *             longitude:
 *               type: number
 *
 *     DeliverySettings:
 *       type: object
 *       properties:
 *         hasDelivery:
 *           type: boolean
 *           description: Se oferece delivery
 *         deliveryFee:
 *           type: number
 *           description: Taxa de entrega
 *         minimumOrder:
 *           type: number
 *           description: Pedido mínimo
 *         deliveryRadius:
 *           type: number
 *           description: Raio de entrega em km
 *         estimatedTime:
 *           type: string
 *           example: "30-45 min"
 *           description: Tempo estimado de entrega
 *
 *     Subscription:
 *       type: object
 *       properties:
 *         planId:
 *           type: string
 *           description: ID do plano
 *         planName:
 *           type: string
 *           description: Nome do plano
 *         status:
 *           type: string
 *           enum: [active, inactive, suspended, canceled]
 *           description: Status da assinatura
 *         startDate:
 *           type: string
 *           format: date
 *           description: Data de início
 *         endDate:
 *           type: string
 *           format: date
 *           description: Data de fim
 *         renewalDate:
 *           type: string
 *           format: date
 *           description: Data de renovação
 *         price:
 *           type: number
 *           description: Preço da assinatura
 *         paymentMethod:
 *           type: string
 *           enum: [credit_card, debit_card, pix, bank_slip]
 *           description: Método de pagamento
 *         autoRenewal:
 *           type: boolean
 *           description: Renovação automática
 */

/**
 * @swagger
 * /establishment:
 *   get:
 *     tags:
 *       - Establishment
 *     summary: Buscar estabelecimento autenticado
 *     description: Retorna os dados do estabelecimento autenticado
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Estabelecimento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 email:
 *                   type: string
 *                 phone:
 *                   type: string
 *                 schedule:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Schedule'
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Estabelecimento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
establishmentRoutes.get("/", ensureAuth, findEstablishment);

/**
 * @swagger
 * /establishment/schedule:
 *   put:
 *     tags:
 *       - Establishment
 *     summary: Atualizar horário de funcionamento
 *     description: Atualiza os horários de funcionamento do estabelecimento
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               schedule:
 *                 type: array
 *                 items:
 *                   $ref: '#/components/schemas/Schedule'
 *     responses:
 *       200:
 *         description: Horários atualizados com sucesso
 *       401:
 *         description: Não autenticado
 *       500:
 *         description: Erro interno ao atualizar horário
 */
establishmentRoutes.put("/schedule", ensureAuth, setSchedule);

/**
 * @swagger
 * /establishment/basic-info:
 *   put:
 *     tags:
 *       - Establishment
 *     summary: Atualizar informações básicas
 *     description: Atualiza nome, descrição, categoria e contatos básicos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: Nome do estabelecimento
 *               description:
 *                 type: string
 *                 maxLength: 500
 *                 description: Descrição do estabelecimento
 *               category:
 *                 type: string
 *                 enum: [restaurant, bar, cafe, fast_food, pizzeria, bakery, other]
 *                 description: Categoria do estabelecimento
 *               website:
 *                 type: string
 *                 description: Website do estabelecimento
 *               whatsapp:
 *                 type: string
 *                 description: Número do WhatsApp
 *     responses:
 *       200:
 *         description: Informações atualizadas com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Estabelecimento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
establishmentRoutes.put("/basic-info", ensureAuth, updateBasicInfo);

/**
 * @swagger
 * /establishment/address:
 *   put:
 *     tags:
 *       - Establishment
 *     summary: Atualizar endereço
 *     description: Atualiza o endereço completo do estabelecimento
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: Endereço atualizado com sucesso
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Estabelecimento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
establishmentRoutes.put("/address", ensureAuth, updateAddress);

/**
 * @swagger
 * /establishment/business-info:
 *   put:
 *     tags:
 *       - Establishment
 *     summary: Atualizar informações comerciais
 *     description: Atualiza CNPJ, CPF e razão social
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cnpj:
 *                 type: string
 *                 description: CNPJ do estabelecimento
 *               cpf:
 *                 type: string
 *                 description: CPF do responsável
 *               businessName:
 *                 type: string
 *                 description: Razão social
 *     responses:
 *       200:
 *         description: Informações comerciais atualizadas
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Estabelecimento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
establishmentRoutes.put("/business-info", ensureAuth, updateBusinessInfo);

/**
 * @swagger
 * /establishment/delivery-settings:
 *   put:
 *     tags:
 *       - Establishment
 *     summary: Atualizar configurações de delivery
 *     description: Atualiza todas as configurações relacionadas ao delivery
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/DeliverySettings'
 *     responses:
 *       200:
 *         description: Configurações de delivery atualizadas
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Estabelecimento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
establishmentRoutes.put(
	"/delivery-settings",
	ensureAuth,
	updateDeliverySettings
);

/**
 * @swagger
 * /establishment/social-media:
 *   put:
 *     tags:
 *       - Establishment
 *     summary: Atualizar redes sociais
 *     description: Atualiza links das redes sociais
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               instagram:
 *                 type: string
 *                 description: URL do Instagram
 *               facebook:
 *                 type: string
 *                 description: URL do Facebook
 *               twitter:
 *                 type: string
 *                 description: URL do Twitter
 *     responses:
 *       200:
 *         description: Redes sociais atualizadas
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Estabelecimento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
establishmentRoutes.put("/social-media", ensureAuth, updateSocialMedia);

/**
 * @swagger
 * /establishment/media:
 *   put:
 *     tags:
 *       - Establishment
 *     summary: Atualizar mídia
 *     description: Atualiza logo, imagem de capa e fotos
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               logo:
 *                 type: string
 *                 description: URL do logo
 *               coverImage:
 *                 type: string
 *                 description: URL da imagem de capa
 *               photos:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     url:
 *                       type: string
 *                       description: URL da foto
 *                     alt:
 *                       type: string
 *                       description: Texto alternativo
 *                     order:
 *                       type: number
 *                       description: Ordem de exibição
 *     responses:
 *       200:
 *         description: Mídia atualizada
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Estabelecimento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
establishmentRoutes.put("/media", ensureAuth, updateMedia);

/**
 * @swagger
 * /establishment/billing-info:
 *   put:
 *     tags:
 *       - Establishment
 *     summary: Atualizar informações de cobrança
 *     description: Atualiza dados do cartão e endereço de cobrança
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cardLastFour:
 *                 type: string
 *                 description: Últimos 4 dígitos do cartão
 *               cardBrand:
 *                 type: string
 *                 description: Bandeira do cartão
 *               holderName:
 *                 type: string
 *                 description: Nome do portador
 *               billingAddress:
 *                 $ref: '#/components/schemas/Address'
 *     responses:
 *       200:
 *         description: Informações de cobrança atualizadas
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Estabelecimento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
establishmentRoutes.put("/billing-info", ensureAuth, updateBillingInfo);

/**
 * @swagger
 * /establishment/subscription:
 *   put:
 *     tags:
 *       - Establishment
 *     summary: Atualizar assinatura
 *     description: Atualiza dados da assinatura do estabelecimento
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscription'
 *     responses:
 *       200:
 *         description: Assinatura atualizada
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Estabelecimento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
establishmentRoutes.put("/subscription", ensureAuth, updateSubscription);

/**
 * @swagger
 * /establishment/features:
 *   put:
 *     tags:
 *       - Establishment
 *     summary: Atualizar recursos
 *     description: Atualiza recursos disponíveis baseados no plano
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               maxProducts:
 *                 type: number
 *                 description: Máximo de produtos permitidos
 *               maxPhotos:
 *                 type: number
 *                 description: Máximo de fotos permitidas
 *               canAcceptOnlineOrders:
 *                 type: boolean
 *                 description: Pode aceitar pedidos online
 *               canUseAnalytics:
 *                 type: boolean
 *                 description: Pode usar analytics
 *               canCustomizeTheme:
 *                 type: boolean
 *                 description: Pode customizar tema
 *     responses:
 *       200:
 *         description: Recursos atualizados
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Estabelecimento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
establishmentRoutes.put("/features", ensureAuth, updateFeatures);

/**
 * @swagger
 * /establishment/status:
 *   put:
 *     tags:
 *       - Establishment
 *     summary: Atualizar status
 *     description: Atualiza status e aprovação do estabelecimento
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [pending, active, suspended, inactive]
 *                 description: Status do estabelecimento
 *               isApproved:
 *                 type: boolean
 *                 description: Se está aprovado
 *     responses:
 *       200:
 *         description: Status atualizado
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Estabelecimento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
establishmentRoutes.put("/status", ensureAuth, updateStatus);

/**
 * @swagger
 * /establishment/last-login:
 *   put:
 *     tags:
 *       - Establishment
 *     summary: Atualizar último login
 *     description: Atualiza timestamp do último login
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Último login atualizado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Último login atualizado com sucesso"
 *       401:
 *         description: Não autenticado
 *       404:
 *         description: Estabelecimento não encontrado
 *       500:
 *         description: Erro interno do servidor
 */
establishmentRoutes.put("/last-login", ensureAuth, updateLastLogin);
