/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const secretKey = process.env.JWT_SECRET as string;

    if (!token) {
        return res.status(401).json({message: 'Access Denied'});
    }

    try {
        const decoded = jwt.verify(token, secretKey) as { email: string, role: string };
        
        (req as any).user = decoded;
        next();
    } catch (err) {
        if (err instanceof Error) {
            res.status(400).json({message: `Invalid Token`});
        }
    }
};

export const checkRole = (roles: string[]) => {
    return (req: Request, res: Response, next: NextFunction) => {
        if (!roles.includes((req as any).user.role)) {
            return res.status(403).json({error: 'Access denied'});
        }

        next();
    };
};