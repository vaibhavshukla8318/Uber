const http = require('http');
const app = require('./app'); 
const { initializeSocket } = require('./socket');
const port = process.env.PORT || 3000;

const server = http.createServer(app);
initializeSocket(server);

server.listen(port, () => {
  try {
    console.log(`Server is running on port ${port}`);
  } catch (error) {
    console.log("Error listening", error);
  }
});
