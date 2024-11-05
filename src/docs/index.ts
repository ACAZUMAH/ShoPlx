import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
        title: 'Store API',
        version: '1.0.0',
        description: 'Documentation for the store API',
        contact: {
            name: 'API Support',
        },
        servers: [
            {
                'http://localhost:3500' : 'Development'
            }
        ]
        }
    },
    apis: ['src/routes/*.ts']
};

const CSS_URL = "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.1.0/swagger-ui.min.css";

const swaggerSpec = swaggerJsDoc(swaggerOptions);

const setUpSwagger = (app: any) => {
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec,
        {
            customCss:
            '.swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }',
            customCssUrl: CSS_URL,
        }
    ));
};

export default setUpSwagger;