import { Request, Response } from "express";
import rateLimit from "express-rate-limit";
import i18next from "i18next";

export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
    handler: (req: Request, res: Response) => {
        const lang = req.query.lang || 'en';

        i18next.changeLanguage(lang as string).then(() => {
            const message = i18next.t('common:message.rate-limit', { minute: 15 });
            res.status(res.statusCode).json({code: res.statusCode, message: message});
        });
    },
    standardHeaders: true,
    legacyHeaders: false,
});