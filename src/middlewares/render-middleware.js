import { IncomingMessage, ServerResponse } from 'http';
import * as db from '../db/db.js';

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {() => void} next
 */
export default async function renderMiddleware(req, res, next) {
  if (req.url === '/') {
    try {
      const response = await db.query('SELECT * from Athletes');
      const athletes = response.rows;
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(`
        <h1>Athletes</h1>
        <ul>
          ${athletes.map((athlete) => `<li>${athlete.athlete_name}</li>`).join('')}
        </ul>
      `);
      res.end();
    } catch (error) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end();
    }
  }

  next();
}
