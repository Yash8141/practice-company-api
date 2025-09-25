import express from "express";
import {
  createEmployee,
  getEmployees,
  registerEmployeeWithLogin,
} from "../controllers/employeeController.js";
import authenticateJwt from "../middleware/auth.js";

const router = express.Router();

/**
 * @openapi
 * /api/employees:
 *   post:
 *     summary: Create an employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               age: { type: integer }
 *               dob: { type: string }
 *               city: { type: string }
 *               departmentId: { type: string }
 *     responses:
 *       201:
 *         description: Employee created
 */
router.post("/", createEmployee);

/**
 * @openapi
 * /api/employees:
 *   get:
 *     summary: List employees
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of employees
 */
router.get("/", authenticateJwt, getEmployees);

/**
 * @openapi
 * /api/employees/register:
 *   post:
 *     summary: Create login linked to existing employee
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username: { type: string }
 *               password: { type: string }
 *               employeeId: { type: string }
 *     responses:
 *       201:
 *         description: Login created for employee
 */
router.post("/register", registerEmployeeWithLogin);

export default router;
