import { IInventory } from "@models/Inventory";
import { db } from "@config/firebase";

class InventoryService {
    async addItem(item: IInventory) {
        const itemRef = db.collection('inventories').doc();
        await itemRef.set(item);

        return itemRef.id;
    }

    async getItems() {
        const snapshot = await db.collection('inventories').get();
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    }

    async updateItem(id: string, item: IInventory) {
        const newInventory = {...item};

        const itemRef = db.collection('inventories').doc(id);
        await itemRef.update(newInventory);
    }

    async deleteItem(id: string) {
        const itemRef = db.collection('inventories').doc(id);
        await itemRef.delete();
    }
}

export default new InventoryService();