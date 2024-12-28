const server = require('./src/app.js'); 
const connectDb = require('./src/db.js'); 
const http = require('http');

const httpServer = http.createServer(server);

connectDb().then(() => {
  httpServer.listen(process.env.PORT || 3001, () => {
    console.log('%s listening at 3001');
  });
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});
