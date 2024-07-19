import { IncomingMessage, ServerResponse } from 'http';
import * as db from './db.js';

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {() => void} next
 */
export default async function apiMiddleware(req, res, next) {
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
