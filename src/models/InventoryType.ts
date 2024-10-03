/**
 * @swagger
 * components:
 *   schemas:
 *     InventoryType:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the inventory type
 *         name:
 *           type: string
 *           description: The name of the inventory type
 *         description:
 *           type: string
 *           description: The description of the inventory type
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The crated date of the inventory type
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The updated date of the inventory type
 *       example:
 *         id: d5fE_asz
 *         name: ESU COUNTER
 *         description: Tipe untuk peralatan dengan esu counter
 */

export interface IInventoryType {
    id: string;
    name: string;
    description?: string;
    created_at?: Date;
    updated_at?: Date;
}