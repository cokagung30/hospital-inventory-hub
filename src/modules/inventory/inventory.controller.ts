import { Request, Response } from "express";
import inventoryService from "./inventory.service";

class InventoryController {
    async addItem(req: Request, res: Response) {
        try {
            const itemId = await inventoryService.addItem(req.body);
            res.json({id: itemId});
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({message: error.message});
            }
        }
    }

    async getItems(req: Request, res: Response) {
        try {
            const items = await inventoryService.getItems();
            res.json(items);
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({message: error.message});
            }
        }
    }
    
    async updateItem(req: Request, res: Response) {
        try {
            await inventoryService.updateItem(req.params.id, req.body);
            res.json({message: 'Item updated successfully'});
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({message: error.message});
            }
        }
    }

    async deleteItem(req: Request, res: Response) {
        try {
            await inventoryService.deleteItem(req.params.id);
            res.json({message: 'Item deleted successfully'});
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({message: error.message});
            }
        }
    }
}

export default new InventoryController();