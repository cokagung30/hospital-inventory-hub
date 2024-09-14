import { Router } from "express";
import authController from "./auth.controller";
import { validate } from "../../middleware/validationMiddleware";
import { registerSchema } from "../../utils/authValidationSchemas";
import { loginSchema } from "../../utils/authValidationSchemas";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Auth
 *  description: Authentication endpoints
 */

/**
 * @swagger
 * /api/auth/register:
 *  post:
 *      summary: Register a new user
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *                          role:
 *                              type: string
 *      responses:
 *          200:
 *              description: User registered successfully
 *          400:
 *              description: Invalid input
 */
router.post('/register', validate([registerSchema]), authController.register);

/**
 * @swagger
 * /api/auth/login:
 *  post:
 *      summary: Login a user
 *      tags: [Auth]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          email:
 *                              type: string
 *                          password:
 *                              type: string
 *      responses:
 *          200:
 *              description: User logged in successfully
 *          400:
 *              description: Invalid credentials
 */
router.post('/login', validate([loginSchema]), authController.login);

export default router;