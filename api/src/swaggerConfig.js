const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Task API',
      version: '1.0.0',
      description: 'API para la gestión de tareas',
    },
    servers: [
      {
        url: 'http://localhost:3001/api', 
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/routes/*.js'], 
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);

module.exports = swaggerSpecs;
