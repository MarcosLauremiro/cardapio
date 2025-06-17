import { Router } from "express";
import {
	CreateCategory,
	deleteCategory,
	listCategories,
	listProductsByCategory,
	updateCategory,
} from "../controller/CategoryController";
import { ensureAuth } from "../middleware/authMiddlewate";

export const routerCategory = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         icon:
 *           type: string
 */

//List categories
/**
 * @swagger
 * /categories:
 *   get:
 *     tags:
 *       - Categorias
 *     summary: Buscar todas as categorias do estabelecimento
 *     description: Retorna todas as categorias do estabelecimento
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Categorias Listadas
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 icon:
 *                   type: string
 *                 isActive:
 *                   type: boolean
 */
routerCategory.get("/", ensureAuth, listCategories);

//Create Category
/**
 * @swagger
 * /categories:
 *   post:
 *     tags:
 *       - Categorias
 *     summary: Criar uma nova categoria
 *     description: Cria uma nova categoria no banco de dados
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - icon
 *             properties:
 *               name:
 *                 type: string
 *               icon:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Categoria criada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 icon:
 *                   type: string
 */

routerCategory.post("/", ensureAuth, CreateCategory);

//get products by category
/**
 * @swagger
 * /categories/{categoryId}/products:
 *   get:
 *     tags:
 *       - Categorias
 *     summary: Listar produtos por categoria
 *     description: Retorna todos os produtos vinculados a uma categoria específica
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria
 *     responses:
 *       200:
 *         description: Lista de produtos da categoria
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   price:
 *                     type: number
 *                   description:
 *                     type: string
 *                   image:
 *                     type: string
 *                   categoryId:
 *                     type: string
 *       404:
 *         description: Categoria não encontrada ou sem produtos
 */
routerCategory.get("/:categoryId/products", ensureAuth, listProductsByCategory);

//update category
/**
 * @swagger
 * /categories/{categoryId}:
 *   put:
 *     tags:
 *       - Categorias
 *     summary: Atualizar uma categoria
 *     description: Atualiza os dados de uma categoria existente no banco de dados
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria a ser atualizada
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               icon:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Categoria atualizada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 icon:
 *                   type: string
 *                 isActive:
 *                   type: boolean
 *       404:
 *         description: Categoria não encontrada
 */
routerCategory.put("/:categoryId", ensureAuth, updateCategory);

//delete category
/**
 * @swagger
 * /categories/{categoryId}:
 *   delete:
 *     tags:
 *       - Categorias
 *     summary: Deletar uma categoria
 *     description: Deleta uma categoria existente a partir do seu ID
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da categoria que será deletada
 *     responses:
 *       200:
 *         description: Categoria deletada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Categoria deletada com sucesso
 *       404:
 *         description: Categoria não encontrada
 */
routerCategory.delete("/:categoryId", ensureAuth, deleteCategory);
