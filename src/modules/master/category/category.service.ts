import { ICategory } from '@models/Category';
import { db } from '@config/firebase';
import admin from 'firebase-admin';
import { esClient } from '@config/elasticsearch';

class CategoryService {
    private static COLLECTION = db.collection('categories');

    async create(category: ICategory): Promise<ICategory> {
        await Promise.all([
            esClient.index({
                index: 'categories',
                id: category.id,
                body: category,
            }),
            CategoryService.COLLECTION.doc(category.id).set(category)
        ]);

        return category;
    }

    async fetch(search?: string): Promise<ICategory[]> {
        const query = (search == null) 
            ? { match_all: {} } 
            : { wildcard: { name: `*${search.toLowerCase()}*` } };


        const result = await esClient.search<ICategory>({
            index: 'categories',
            body: { query: query }
        });

        return result.hits.hits.map(hit => hit._source as ICategory);
    }

    async find(id: string): Promise<ICategory | null> {
        const result = await esClient.get({
            index: 'categories',
            id: id
        });

        if (result.found) {
            return result._source as ICategory;
        }


        return null;
    }

    async update(data: ICategory): Promise<ICategory> {
        
        const updatedAt = admin.firestore.Timestamp.now().toDate();

        const category = {
            ...data,
            description: data.description || null,
            updated_at: updatedAt,
        };

        await Promise.all([
            esClient.update({
                index: 'categories',
                id: category.id,
                doc: category,
            }),
            CategoryService.COLLECTION.doc(data.id).update(category)
        ]);



       return category as ICategory;
    }

    async delete(id: string): Promise<void> {
        await Promise.all([
            esClient.delete({index: 'categories', id}),
            CategoryService.COLLECTION.doc(id).delete()
        ]);
    }
}

export default new CategoryService();