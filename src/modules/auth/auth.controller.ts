import { Request, Response } from "express";
import jwt from 'jsonwebtoken';
import authService from "./auth.service";

class AuthController {
    async register(req: Request, res: Response) {
        const {email, password, role} = req.body;

        try {
            const user = await authService.register(email, password, role);

            res.json({user});
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({message: error.message});
            }
        }
    }

    async login(req: Request, res: Response) {
        const {email, password} = req.body;
        const secretKey = process.env.JWT_SECRET as string;

        try {
            const user = await authService.login(email, password);
            const token = jwt.sign({email: user.email, role: user.role}, secretKey, {expiresIn: '1h'});

            const result = {
                id: user.id,
                email: user.email,
                role: user.role,
                token: token,
            };

            res.status(200).json({ 
                code: res.statusCode,
                message: 'Sign in successfully',
                data: result
            });
        } catch (error) {
            if (error instanceof Error) {
                res.status(401).json({
                    code: res.statusCode,
                    message: error.message,
                });
            }
        }
    }
}

export default new AuthController();