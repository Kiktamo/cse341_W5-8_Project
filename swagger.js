const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My Worldbuilding API',
    description: 'Worldbuilding API',
  },
  host: 'worldbuilding-api.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);