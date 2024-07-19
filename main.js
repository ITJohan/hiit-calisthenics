import http from 'http';
import * as db from './db.js';

const PORT = 3000;

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {(req, res) => void} next
 */
function renderMiddleware(req, res, next) {
  if (req.url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write('<h1>Hello world</h1>');
    res.end();
  }

  next();
}

/**
 * @param {http.IncomingMessage} req
 * @param {http.ServerResponse} res
 * @param {(req, res) => void} next
 */
async function apiMiddleware(req, res, next) {
  if (req.url === '/api/exercises' && req.method === 'GET') {
    try {
      const response = await db.query('SELECT * FROM Exercises');
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.write(JSON.stringify(response.rows));
      res.end();
    } catch (err) {
      console.error(err);
      res.writeHead(400);
      res.end();
    }
  }

  next();
}

const server = http.createServer(
  async (req, res) => await renderMiddleware(req, res, async () => await apiMiddleware(req, res, () => {}))
);

server.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
