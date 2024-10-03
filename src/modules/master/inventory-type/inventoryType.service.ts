import { esClient } from "@config/elasticsearch";
import { db } from "@config/firebase";
import admin from 'firebase-admin';
import { IInventoryType } from "@models/InventoryType";

class InventoryTypeService {
    private static COLLECTION = db.collection('inventory_type');

    async create(inventoryType: IInventoryType): Promise<IInventoryType> {
        await Promise.all([
            esClient.index({
                index: 'inventory_type',
                id: inventoryType.id,
                body: inventoryType,
            }),
            InventoryTypeService.COLLECTION.doc(inventoryType.id).set(inventoryType)
        ]);

        return inventoryType;
    }

    async fetch(search?: string): Promise<IInventoryType[]> {
        const query = (search == null) 
            ? { match_all: {} } 
            : { wildcard: { name: `*${search.toLowerCase()}*` } };

        const result = await esClient.search<IInventoryType>({
            index: 'inventory_type',
            body: { query: query }
        });

        return result.hits.hits.map(hit => hit._source as IInventoryType);
    }

    async find(id: string): Promise<IInventoryType | null> {
        const result = await esClient.get({
            index: 'inventory_type',
            id: id
        });

        if (result.found) {
            return result._source as IInventoryType;
        }


        return null;
    }

    async update(inventoryType: IInventoryType): Promise<IInventoryType> {
        const updatedAt = admin.firestore.Timestamp.now().toDate();

        const data = {
            ...inventoryType,
            description: inventoryType.description || null,
            updated_at: updatedAt,
        };

        await Promise.all([
            esClient.update({
                index: 'inventory_type',
                id: data.id,
                doc: data,
            }),
            InventoryTypeService.COLLECTION.doc(data.id).update(data)
        ]);

        return data as IInventoryType;
    }

    async delete(id: string): Promise<void> {
        await Promise.all([
            esClient.delete({index: 'inventory_type', id}),
            InventoryTypeService.COLLECTION.doc(id).delete()
        ]);
    }
}

export default new InventoryTypeService();