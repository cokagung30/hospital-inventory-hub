import { checkSchema } from "express-validator";

export const registerSchema = checkSchema({
    email: {
        isEmail: {
            errorMessage: 'Email is invalid',
        },
        trim: true,
        normalizeEmail: true,
    },
    password: {
        isLength: {
            errorMessage: 'Password must be at least 8 characters long',
            options: {
                min: 8
            },
        },
        matches: {
            options: [/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?.&])[A-Za-z\d@$!%*#?.&]{8,}$/],
            errorMessage: 'Password must contain at least one letter, one number, and one special character (@$!%*#?.&)',
        },
    },
});

export const loginSchema = checkSchema({
    email: {
        notEmpty: true,
        errorMessage: "Email can't empty",
    },
    password: {
        notEmpty: true,
        errorMessage: "Password can't empty",
    },
});