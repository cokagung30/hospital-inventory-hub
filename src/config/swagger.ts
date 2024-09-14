import swaggerJSDoc from 'swagger-jsdoc';
import { OpenAPIV3 } from 'openapi-types';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'API Documentation',
            version: '1.0.0',
            description: 'API documentation using Swagger',
        },
        components: {
            parameters: {
                lang: {
                    name: 'lang',
                    in: 'query',
                    required: false, 
                    schema: {
                        type: 'string',
                        example: 'en',
                    },
                    description: 'Language code (e.g., en for English, id for Indonesia)'
                },
            },
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                } 
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
        paths: {},
    } as OpenAPIV3.Document,
    apis: ['./src/**/*.ts']
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerSpec };

