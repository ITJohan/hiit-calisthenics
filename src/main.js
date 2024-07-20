import http from 'http';
import renderMiddleware from './middlewares/render-middleware.js';
import logMiddleware from './middlewares/log-middleware.js';
import fileMiddleware from './middlewares/file-middleware.js';

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  await logMiddleware(req, res, async () => {
    await fileMiddleware(req, res, async () => {
      await renderMiddleware(req, res, async () => {});
    });
  });
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
