import express from "express";
import {
  createDepartment,
  listDepartment,
} from "../controllers/departmentController.js";

const router = express.Router();

/**
 * @openapi
 * /api/departments:
 *   post:
 *     summary: Create department
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name: { type: string }
 *               description: { type: string }
 *     responses:
 *       201:
 *         description: Department created
 */
router.post("/", createDepartment); // create

/**
 * @openapi
 * /api/departments:
 *   get:
 *     summary: List departments
 *     responses:
 *       200:
 *         description: List of departments
 */
router.get("/", listDepartment); // get

export default router;
