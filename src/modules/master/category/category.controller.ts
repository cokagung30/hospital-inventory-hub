import { Request, Response } from "express";
import { ICategory } from "@models/Category";
import { v4 as uuidv4 } from 'uuid';
import admin from 'firebase-admin';
import categoryService from "@modules/master/category/category.service";
import i18next from "i18next";

class CategoryController {
    async create(req: Request, res: Response): Promise<void> {
        try {
            const {name, description} = req.body;
            const categoryId = uuidv4();
        
            const data: ICategory = {
                id: categoryId,
                name: name,
                description: description || null,
                created_at: admin.firestore.Timestamp.now().toDate(),
                updated_at: admin.firestore.Timestamp.now().toDate(),
            };

            const category = await categoryService.create(data);
            res.status(201).json({message: i18next.t('category:message.insert-success'), data: category});
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({message: error.message});
            }
        }
    }

    async fetch(req: Request, res: Response): Promise<void> {
        const { search } = req.query;

        try {
            const categories = await categoryService.fetch(search as string);
            res.status(200).json({message: `Category fetched`, data: categories});
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({message: error.message});
            }
        }
    }

    async find(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const category = await categoryService.find(id);
            res.status(200).json({message: 'Category detail fetched', data: category});
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({message: error.message});
            }
        } 
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { name, description } = req.body;

            const data: ICategory = {id, name, description};
            const categoryUpdated = await categoryService.update(data);

            res.status(200).json({
                code: res.statusCode,
                message: 'Category updated successfully', 
                data: categoryUpdated
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    code: res.statusCode,
                    message: error.message,
                });
            }
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await categoryService.delete(id);

            res.status(200).json({
                code: res.statusCode,
                message: i18next.t('category:message.delete-success'),
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    code: res.statusCode,
                    message: error.message,
                });
            }
        }
    }
}

export default new CategoryController();