import { checkSchema } from "express-validator";

export const addInventorySchema = checkSchema({
    category: {
        notEmpty: {
            errorMessage: 'Category is required'
        }
    },
    product: {
        notEmpty: {
            errorMessage: 'Product is required'
        }
    },
    brand: {
        notEmpty: {
            errorMessage: 'Brand is required'
        }
    },
    type: {
        notEmpty: {
            errorMessage: 'Type is required'
        }
    },
    year: {
        isLength: {
            errorMessage: 'Year must be at least 4 characters long',
            options: { min: 4 }
        },
        notEmpty: { errorMessage: 'Year is required' }
    },
    room: {
        notEmpty: { errorMessage: 'Room is required' }
    },
    price: {
        notEmpty: { errorMessage: 'Price is required' }
    },
    buyDate: {
        notEmpty: { errorMessage: 'Buy date is required' },
        isDate: {
            errorMessage: 'Buy date must be in the format (YYYY-MM-DD)',
            options: { format: 'YYYY-MM-DD' }
        }
    },
});
