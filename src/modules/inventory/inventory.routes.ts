import { Router } from "express";
import { authMiddleware, checkRole } from "../../middleware/authMiddleware";
import inventoryController from "./inventory.controller";
import { validate } from "../../middleware/validationMiddleware";
import { addInventorySchema } from "../../utils/inventoryValidationSchemas";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Inventories
 *   description: The inventories managing API
 */

/**
 * @swagger
 * /api/inventory/add:
 *   post:
 *     summary: Create a new inventory
 *     tags: [Inventories]
 *     security:
 *      - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventories'
 *     responses:
 *       201:
 *         description: The inventory was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventories'
 *       500:
 *         description: Some server error
 */
router.post('/add', authMiddleware, checkRole(['admin']), validate([addInventorySchema]), inventoryController.addItem);

/**
 * @swagger
 * /api/inventory:
 *   get:
 *     summary: Returns the list of all the inventories
 *     tags: [Inventories]
 *     security:
 *      - bearerAuth: []
 *     responses:
 *       200:
 *         description: The list of the inventories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Inventories'
 */
router.get('/', authMiddleware, checkRole(['admin']), inventoryController.getItems);

/**
 * @swagger
 * /api/inventory/{id}:
 *   put:
 *     summary: Update the inventory by the id
 *     tags: [Inventories]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The inventory id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Inventories'
 *     responses:
 *       200:
 *         description: The inventory was updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Inventories'
 *       404:
 *         description: The inventory was not found
 *       500:
 *         description: Some error happened
 */
router.put('/update/:id', authMiddleware, checkRole(['admin']), inventoryController.updateItem);

/**
 * @swagger
 * /api/inventory/{id}:
 *   delete:
 *     summary: Remove the inventory by id
 *     tags: [Inventories]
 *     security:
 *      - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The item id
 *     responses:
 *       200:
 *         description: The item was deleted
 *       404:
 *         description: The item was not found
 */
router.delete('/delete/:id', authMiddleware, checkRole(['admin']), inventoryController.deleteItem);

export default router;