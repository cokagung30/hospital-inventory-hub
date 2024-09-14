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

export interface IInventory {
    id: string;
    category: string;
    product: string;
    brand: string;
    type: string;
    room: string;
    price: number;
    buyDate: Date;
    vendor: string;
    size: number;
    number: string;
    condition: string;
}