import { checkSchema } from "express-validator";
import { getFirestore } from "firebase-admin/firestore";
import i18next from "i18next";

export const validateInventoryTypeIdSchema = checkSchema({
    id: {
        in: ['params'],
        notEmpty: {
            errorMessage: i18next.t('common:message.required', { field: 'id' })
        },
        custom: {
            options: async(valuue) => {
                const db = getFirestore();
                const doc = await db.collection('inventory_type').doc(valuue).get();

                if (doc.exists) {
                    throw new Error(i18next.t('common:message.not-found', { type: 'Inventory Type' }));
                }

                return true;
            }
        }
    }
});

export const createInventoryTypeValidationSchema = checkSchema({
    name: {
        notEmpty: {
            errorMessage: i18next.t('common:message.required', { field: 'Name' })
        }
    }
});

export const updateInventoryTypeValidationSchema = checkSchema({
    name: {
        notEmpty: {
            errorMessage: i18next.t('common:message.required', { field: 'Name' })
        }
    }
});