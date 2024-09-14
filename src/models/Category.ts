/**
 * @swagger
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       required:
 *         - id
 *         - name
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the category
 *         name:
 *           type: string
 *           description: The name of the category
 *         description:
 *           type: string
 *           description: The description of the category
 *         created_at:
 *           type: string
 *           format: date-time
 *           description: The crated date of the category
 *         updated_at:
 *           type: string
 *           format: date-time
 *           description: The updated date of the category
 *       example:
 *         id: d5fE_asz
 *         name: ELEKTROMEDIK
 *         description: Kategori untuk peralatan dengan elektromedik
 */

export interface ICategory {
    id: string;
    name: string;
    description?: string;
    created_at?: Date;
    updated_at?: Date;
}