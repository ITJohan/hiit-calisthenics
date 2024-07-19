import http from 'http';
import renderMiddleware from './render-middleware.js';
import apiMiddleware from './api-middleware.js';

const PORT = 3000;

const server = http.createServer(
  async (req, res) => await renderMiddleware(req, res, async () => await apiMiddleware(req, res, () => {}))
);

server.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
