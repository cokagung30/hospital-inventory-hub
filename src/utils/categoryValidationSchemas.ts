import { checkSchema } from "express-validator";
import { getFirestore } from "firebase-admin/firestore";
import i18next from "i18next";

export const validateCategoryIdSchema = checkSchema({
    id: {
        in: ['params'],
        notEmpty: {
            errorMessage: i18next.t('common:message.required', { field: 'Id' })
        },
        custom: {
            options: async (value) => {
                const db = getFirestore();
                const doc = await db.collection('categories').doc(value).get();

                if (!doc.exists) {
                    throw new Error(i18next.t('common:message.not-found', { type: 'Category' }));
                }

                return true;
            }
        }
    }
});

export const createCategoryValidationSchema = checkSchema({
    name: {
        notEmpty: {
            errorMessage: i18next.t('common:message.required', { field: 'Name' })
        }
    }
});

export const updateCategoryValidationSchema = checkSchema({
    name: {
        notEmpty: {
            errorMessage: i18next.t('common:message.required', { field: 'Name' })
        }
    }
});