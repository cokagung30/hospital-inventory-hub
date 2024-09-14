import { Router } from "express";
import { authMiddleware, checkRole } from "../../middleware/authMiddleware";
import inventoryController from "./inventory.controller";
import { validate } from "../../middleware/validationMiddleware";
import { addInventorySchema } from "../../utils/inventoryValidationSchemas";

const router = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Inventories:
 *       type: object
 *       required:
 *         - category
 *         - product
 *         - brand
 *         - type
 *         - year
 *         - room
 *         - price
 *         - buyDate
 *         - vendor
 *         - size
 *         - number
 *         - name
 *         - condition
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the inventory
 *         category:
 *           type: string
 *           description: The category of the inventory
 *         product:
 *           type: string
 *           description: The product of the inventory
 *         brand:
 *           type: string
 *           description: The brand of the inventory
 *         type:
 *           type: string
 *           description: The type of the inventory
 *         year:
 *           type: integer
 *           description: The year of the inventory
 *         room:
 *           type: string
 *           description: The room of the inventory
 *         price:
 *           type: integer
 *           description: The price of the inventory
 *         buyDate:
 *           type: string
 *           format: date-time
 *           description: The buy date of the inventory
 *         vendor:
 *           type: string
 *           description: The vendor of the inventory
 *         size:
 *           type: string
 *           description: The size of the inventory
 *         number:
 *           type: string
 *           description: The number of the inventory
 *         condition:
 *           type: string
 *           description: The condition of the inventory
 *       example:
 *         id: d5fE_asz
 *         category: Elektronik
 *         product: AC
 *         brand: LG
 *         type: MBR 50
 *         year: 2024
 *         room: Padma
 *         price: 2000000
 *         buyDate: 2024-06-30
 *         vendor: Lian
 *         size: 1/2 PK
 *         number: 1.1.4.3.Padma.1
 *         condition: Baik
 */

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