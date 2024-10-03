import { authMiddleware, checkRole } from "@middleware/authMiddleware";
import { i18nMiddleware } from "@middleware/i18nMiddleware";
import { Router } from "express";
import inventoryTypeController from "./inventoryType.controller";
import { validate } from "@middleware/validationMiddleware";
import { createInventoryTypeValidationSchema, validateInventoryTypeIdSchema } from "@utils/inventoryTypeValidationSchemas";
import { updateCategoryValidationSchema } from "@utils/categoryValidationSchemas";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Inventory Type
 *  description: Inventory Type endpoints
 */

/**
 * @swagger
 * /api/master/inventory-type:
 *  get:
 *      summary: Search inventory type by name
 *      tags: [Inventory Type]
 *      parameters:
 *          - in: query
 *            name: search
 *            schema:
 *              type: string
 *            description: The search query
 *          - $ref: '#/components/parameters/lang'
 *      responses:
 *          200:
 *              description: List of inventory types matching the search query
 *          500:
 *              description: Some server error
 */
router.get('/', authMiddleware, i18nMiddleware, checkRole(['admin']), inventoryTypeController.fetch);

/**
 * @swagger
 * /api/master/inventory-type:
 *  post:
 *      summary: Create a new inventory type
 *      tags: [Inventory Type]
 *      parameters:
 *          - $ref: '#/components/parameters/lang'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: The name of the inventory type
 *      responses:
 *          201:
 *              description: Inventory type created successfully
 *          400:
 *              description: Invalid input
 *          500:
 *              description: Some server error
 */
router.post(
    '/', 
    authMiddleware, 
    i18nMiddleware, 
    checkRole(['admin']), 
    validate([createInventoryTypeValidationSchema]), 
    inventoryTypeController.create
);

/**
 * @swagger
 * /api/master/inventory-type/{id}:
 *  put:
 *      summary: Update a inventory type
 *      tags: [Inventory Type]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: Inventory type ID
 *          - $ref: '#/components/parameters/lang'
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: Updated inventory type name
 *      responses:
 *          200:
 *              description: Inventory type updated successfully
 *          400:
 *              description: Invalid input
 *          404:
 *              description: Inventory type not found
 *          500:
 *              description: Some server error
 */
router.put(
    '/:id',
    authMiddleware,
    i18nMiddleware,
    checkRole(['admin']),
    validate([updateCategoryValidationSchema, validateInventoryTypeIdSchema]),
    inventoryTypeController.update
);

/**
 * @swagger
 * /api/master/inventory-type/{id}:
 *  get:
 *      summary: Get detail inventory type
 *      tags: [Inventory Type]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: Inventory type Id
 *          - $ref: '#/components/parameters/lang'
 *      responses: 
 *          200:
 *              description: Inventory type fetch successfully
 *          400:
 *              description: Invalid input
 *          404:
 *              description: Inventory type not found
 *          500:
 *              description: Internal server error
 */
router.get(
    '/:id', 
    authMiddleware, 
    i18nMiddleware, 
    checkRole(['admin']), 
    validate([validateInventoryTypeIdSchema]), 
    inventoryTypeController.find
);

/**
 * @swagger
 * /api/master/inventory-type/{id}:
 *  delete:
 *      summary: Delete specific category
 *      tags: [Inventory Type]
 *      parameters:
 *          - $ref: '#/components/parameters/lang'
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: Inventory type Id
 *      responses:
 *          200:
 *              description: Inventory type fetch successfully
 *          400:
 *              description: Invalid input
 *          404:
 *              description: Inventory type not found
 *          500:
 *              description: Internal server error
 */
router.delete(
    '/:id', 
    authMiddleware, 
    i18nMiddleware, 
    checkRole(['admin']), 
    validate([validateInventoryTypeIdSchema]), 
    inventoryTypeController.delete
);

export default router;