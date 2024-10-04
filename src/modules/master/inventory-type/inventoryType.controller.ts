import { IInventoryType } from "@models/InventoryType";
import { Request, Response } from "express";
import { v4 as uuidv4 } from 'uuid';
import admin from 'firebase-admin';
import inventoryTypeService from "@modules/master/inventory-type/inventoryType.service";
import i18next from "i18next";

class InventoryTypeController {
    async create(req: Request, res: Response): Promise<void> {
        try {
            const id = uuidv4();
            const today = admin.firestore.Timestamp.now().toDate();
            const {name, description} = req.body;

            const data: IInventoryType = {
                id: id,
                name: name,
                description: description || null,
                created_at: today,
                updated_at: today,
            };

            const inventoryType = await inventoryTypeService.create(data);
            res.status(201).json({
                code: 201,
                message: i18next.t('inventory_type:message.insert-success'),
                data: inventoryType,
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(res.statusCode).json({code: res.statusCode, message: error.message});
            }
        }
    }

    async fetch(req: Request, res: Response): Promise<void> {
        const { search } = req.query;
        
        try {
            const inventoryTypes = await inventoryTypeService.fetch(search as string);

            res.status(200).json({
                code: 200,
                message: i18next.t('inventory_type:message.list-fetched'),
                data: inventoryTypes,
            })
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    code: 500, 
                    message: error.message
                });
            }
        }
    }

    async find(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;

            const inventoryType = await inventoryTypeService.find(id);
            res.status(200).json({
                code: 200,
                message: i18next.t('inventory_type:message.detail-finded'), 
                data: inventoryType
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(res.statusCode).json({
                    code: res.statusCode,
                    message: error.message,
                });
            }
        }
    }

    async update(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const { name, description } = req.body;

            const data: IInventoryType = {id, name, description};
            const inventoryTypeUpdated = await inventoryTypeService.update(data);

            res.status(200).json({
                code: 200,
                message: i18next.t('inventory_type:message.update-success'),
                data: inventoryTypeUpdated,
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(res.statusCode).json({
                    code: res.statusCode,
                    message: error.message,
                });
            }
        }
    }

    async delete(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            await inventoryTypeService.delete(id);

            res.status(200).json({
                code: res.statusCode,
                message: i18next.t('inventory_type:message.delete-success'),
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({
                    code: res.statusCode,
                    message: error.message
                });
            }
        }
    }
}

export default new InventoryTypeController();