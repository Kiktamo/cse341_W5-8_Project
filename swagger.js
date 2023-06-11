const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'My Worldbuilding API',
    description: 'Worldbuilding API',
  },
  host: 'worldbuilding-api.onrender.com',
  schemes: ['https'],
  securityDefinitions: {
  google_auth: {
    type: 'oauth2',
    description: 'Google OAuth2 Authentication',
    flow: 'accessCode',
    authorizationUrl: 'https://accounts.google.com/o/oauth2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    scopes: {
      openid: 'Use Google Sign-In',
      profile: 'View your basic profile info',
      email: 'View your email address'
      }
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);