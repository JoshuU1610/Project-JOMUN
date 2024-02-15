const app = require('./app');
const http = require('http');
const server = http.createServer(app);
const port = 3003;
const { PAGE_URL } = require('./config');

server.listen(port, () => {
  console.log(PAGE_URL);
  console.log(`corriendo en el puerto: ${port}`);
  console.log(`Su servidor inicio en: http://localhost:${port}`);
});