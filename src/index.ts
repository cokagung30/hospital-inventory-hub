import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from '@config/swagger';
import authRouters from '@modules/auth/auth.routes';
import inventoryRouters from '@modules/inventory/inventory.routes';
import categoryRouters from '@modules/master/category/category.routes';
import { i18nPromise } from './i18n';
import { limiter } from '@config/rateLimiter';

i18nPromise.then(() => {
    const app = express();

    app.use(cors());
    app.use(bodyParser.json());

    app.use(express.json());

    app.use(limiter);
    app.use('/api/auth', authRouters);
    app.use('/api/inventory', inventoryRouters);
    app.use('/api/master/category', categoryRouters);
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

    const PORT = process.env.PORT || 5050;
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
        console.log(`Swagger Docs available at http://localhost:${PORT}/api-docs`);
    });
}).catch((err) => {
    console.error('Failed to initialize i18next:', err);
});
