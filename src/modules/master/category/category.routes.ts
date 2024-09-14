import { Router } from "express";
import { checkRole, authMiddleware } from "@middleware/authMiddleware";
import categoryController from '@modules/master/category/category.controller';
import { validate } from "@middleware/validationMiddleware";
import { 
    createCategoryValidationSchema, 
    updateCategoryValidationSchema, 
    validateCategoryIdSchema 
} from "@utils/categoryValidationSchemas";
import { i18nMiddleware } from "@middleware/i18nMiddleware";

const router = Router();

/**
 * @swagger
 * tags:
 *  name: Category
 *  description: Category endpoints
 */

/**
 * @swagger
 * /api/master/category:
 *  get:
 *      summary: Search categories by name
 *      tags: [Category]
 *      parameters:
 *          - in: query
 *            name: search
 *            schema:
 *              type: string
 *            description: The search query
 *      responses:
 *          200:
 *              description: List of categories matching the search query
 *          500:
 *              description: Some server error
 */
router.get('/', authMiddleware, i18nMiddleware, checkRole(['admin']), categoryController.fetch);

/**
 * @swagger
 * /api/master/category:
 *  post:
 *      summary: Create a new category
 *      tags: [Category]
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
 *                              description: The name of the category
 *      responses:
 *          201:
 *              description: Category created successfully
 *          400:
 *              description: Invalid input
 *          500:
 *              description: Some server error
 */
router.post('/', authMiddleware, i18nMiddleware, checkRole(['admin']), validate([createCategoryValidationSchema]), categoryController.create);

/**
 * @swagger
 * /api/master/category/{id}:
 *  put:
 *      summary: Update a category
 *      tags: [Category]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: Category ID
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              description: Updated category name
 *      responses:
 *          200:
 *              description: Category updated successfully
 *          400:
 *              description: Invalid input
 *          404:
 *              description: Category not found
 *          500:
 *              description: Some server error
 */
router.put('/:id', authMiddleware, i18nMiddleware, checkRole(['admin']), validate([updateCategoryValidationSchema, validateCategoryIdSchema]), categoryController.update);

/**
 * @swagger
 * /api/master/category/{id}:
 *  get:
 *      summary: Get detail category
 *      tags: [Category]
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: Category Id
 *      responses: 
 *          200:
 *              description: Category fetch successfully
 *          400:
 *              description: Invalid input
 *          404:
 *              description: Category not found
 *          500:
 *              description: Internal server error
 */
router.get('/:id', authMiddleware, i18nMiddleware, checkRole(['admin']), validate([validateCategoryIdSchema]), categoryController.find);

/**
 * @swagger
 * /api/master/category/{id}:
 *  delete:
 *      summary: Delete specific category
 *      tags: [Category]
 *      parameters:
 *          - $ref: '#/components/parameters/lang'
 *          - in: path
 *            name: id
 *            required: true
 *            schema:
 *              type: string
 *            description: Category Id
 *      responses:
 *          200:
 *              description: Category fetch successfully
 *          400:
 *              description: Invalid input
 *          404:
 *              description: Category not found
 *          500:
 *              description: Internal server error
 */
router.delete('/:id', authMiddleware, i18nMiddleware, checkRole(['admin']), validate([validateCategoryIdSchema]), categoryController.delete);

export default router;