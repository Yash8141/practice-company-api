import express from "express";
import { createLogin, doLogin } from "../controllers/authControllers.js";

const router = express.Router();

/**
 * @openapi
 * /api/auth/create:
 *   post:
 *     summary: Create login and link to employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               employeeId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Login created
 */
router.post("/create", createLogin);

/**
 * @openapi
 * /api/auth/login:
 *   post:
 *     summary: Login and receive JWT
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", doLogin);

export default router;
