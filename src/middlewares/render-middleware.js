import { IncomingMessage, ServerResponse } from 'http';
import { renderIndex } from '../pages/index.js';
import { renderShell } from './shell.js';
import { postWorkout, renderCreate } from '../pages/create.js';
import { renderWorkout } from '../pages/workout.js';
import { renderModify } from '../pages/modify.js';

/**
 * @param {IncomingMessage} req
 * @param {ServerResponse} res
 * @param {() => void} next
 */
export default async function renderMiddleware(req, res, next) {
  if (req.url === '/' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(renderShell(await renderIndex(), []));
    res.end();

    return;
  }

  if (req.url === '/create') {
    if (req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(renderShell(renderCreate(), []));
      res.end();
    }

    if (req.method === 'POST') {
      let body = '';
      req.on('data', (chunk) => (body += chunk.toString()));
      req.on('end', async () => {
        const parsedData = new URLSearchParams(body);
        postWorkout(parsedData);
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(renderShell(await renderIndex(), []));
        res.end();
      });
    }

    return;
  }

  if (req.url === '/workout' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(renderShell(renderWorkout(), []));
    res.end();

    return;
  }

  if (req.url === '/modify' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(renderShell(renderModify(), []));
    res.end();

    return;
  }

  next();
}
