/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import { FieldValidationError, validationResult } from "express-validator";

export const validate = (schemas: any[]) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        await Promise.all(schemas.map((schema) => schema.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        res.status(400).json({errors: errors.array().map(err => {
            const error = err as FieldValidationError;
            return {
                message: error.msg,
                field: error.path
            }
        })});
    };
};