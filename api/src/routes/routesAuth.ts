import { Router } from "express";
import { loginHandle, register } from "../controller/AuthController";

export const authRoutes = Router();

/**
 * @openapi
 * /login:
 *   post:
 *     summary: Autentica usuário e retorna token
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       200:
 *         description: Login bem-sucedido, retorna token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       400:
 *         description: Dados inválidos (faltando campos ou formato errado)
 *       401:
 *         description: Credenciais incorretas
 */
authRoutes.post("/login", loginHandle);

/**
 * @openapi
 * /register:
 *   post:
 *     summary: Cria um novo usuário
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *                 format: password
 *     responses:
 *       201:
 *         description: Usuário criado com sucesso
 *       400:
 *         description: Dados de cadastro inválidos
 *       409:
 *         description: Email já cadastrado
 */
authRoutes.post("/register", register);
