import { NextFunction, Request, Response } from "express";
import i18next from "i18next";


export const i18nMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const lang = req.query.lang || req.cookies?.lang || req.headers['accept-language']?.split(',')[0] || 'en';

    try {
        if (!i18next.isInitialized) {
            console.error('i18next is not initialized yet!');
            throw new Error('i18next not initialized');
        }
    
        console.log(`Setting language to: ${lang}`);
        i18next.changeLanguage(lang as string, (err) => {
            if (err) {
                console.error('Error changing language:', err);
            } else {
                console.log(`Language changed to: ${lang}`);
            }
    
            next();
        });
    } catch (error) {
        console.error('Error in i18nMiddleware:', error);
        next(error);
    }
}