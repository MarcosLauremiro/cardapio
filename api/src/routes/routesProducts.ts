import { Router } from "express";
import {
	createProducts,
	deleteProducts,
	listProducts,
	updateProducts,
} from "../controller/ProductController";
import { ensureAuth } from "../middleware/authMiddlewate";
import { upload } from "../controller/UploadController";

export const productRouter = Router();

//list products

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         description:
 *           type: string
 *         imagePath:
 *           type: string
 *         price:
 *           type: number
 *         ingredients:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *             icon:
 *               type: string
 *         category:
 *           type: string
 *         establishment:
 *           type: string
 *         active:
 *           type: boolean
 */

/**
 * @swagger
 * /products:
 *   get:
 *     tags:
 *       - Produtos
 *     summary: Buscar todos os produtos do estabelecimento
 *     description: Retorna os dados dos produtos do estabelecimento
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Produtos Listados
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 description:
 *                   type: string
 *                 imagePath:
 *                   type: string
 *                 price:
 *                   type: number
 *                 ingredients:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     icon:
 *                       type: string
 *                 category:
 *                   type: string
 *                 establishment:
 *                   type: string
 *                 active:
 *                   type: boolean
 */
productRouter.get("/", ensureAuth, listProducts);

//create product
/**
 * @swagger
 * /products:
 *   post:
 *     tags:
 *       - Produtos
 *     summary: Cria um novo produto
 *     description: Envia uma imagem e os dados do produto via FormData
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - category
 *               - establishment
 *               - image
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               establishment:
 *                 type: string
 *               active:
 *                 type: boolean
 *               ingredients:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     icon:
 *                       type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Produto criado com sucesso
 *       400:
 *         description: Erro na criação do produto
 */
productRouter.post("/", upload.single("image"), ensureAuth, createProducts);

//delet products
/**
 * @swagger
 * /products/{productId}:
 *   delete:
 *     tags:
 *       - Produtos
 *     summary: Deletar um produto
 *     description: Deleta um produto pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     responses:
 *       200:
 *         description: Produto deletado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
productRouter.delete("/:productId", ensureAuth, deleteProducts);

/**
 * @swagger
 * /products/{productId}:
 *   put:
 *     tags:
 *       - Produtos
 *     summary: Atualizar um produto
 *     description: Atualiza os dados de um produto pelo ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: productId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID do produto
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               category:
 *                 type: string
 *               ingredients:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Produto atualizado com sucesso
 *       404:
 *         description: Produto não encontrado
 */
productRouter.put(
	"/:productId",
	upload.single("image"),
	ensureAuth,
	updateProducts
);
