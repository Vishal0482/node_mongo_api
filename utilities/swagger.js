const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

module.exports = (app) => {
    const option = {
        definition: {
            info: {
                title: 'Node Mongo API',
                version: '1.0',
                description: 'Demo API for User Authentication and User Profile.',
                license: {
                    name: "MIT",
                    url: "",
                },
                contact: {
                    name: "vishal parmar",
                    email: "",
                },
            },
            server: [
                {
                    url: 'http://localhost:'+process.env.DEVELOPMENT_PORT
                }
            ]
        },
        apis: ['./routes/*.js']
    };

    const specs = swaggerJsdoc(option);
    app.use(
        '/api-docs',
        swaggerUi.serve,
        swaggerUi.setup(specs, { explorer: true })
    );
}