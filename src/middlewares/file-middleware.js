import { IncomingMessage, ServerResponse } from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {() => void} next
 */
export default async function fileMiddleware(req, res, next) {
  if (req.url === '/favicon.ico') {
    try {
      const file = await readFile(path.resolve('favicon.ico'));
      res.writeHead(200, { 'Content-Type': 'image/x-icon' });
      res.write(file);
      res.end();
    } catch (error) {
      res.writeHead(400);
      res.end();
    }
  }

  if (req.url.startsWith('/src/islands')) {
    try {
      const file = await readFile(path.resolve(req.url.substring(1)));
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(file);
      res.end();
    } catch (error) {
      res.writeHead(400);
      res.end();
    }
  }

  next();
}
