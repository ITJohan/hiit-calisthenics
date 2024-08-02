import { IncomingMessage, ServerResponse } from 'http';
import { renderIndex } from '../pages/index.js';
import { renderShell } from './shell.js';
import { renderCreate } from '../pages/create.js';
import { renderWorkout } from '../pages/workout.js';
import { renderModify } from '../pages/modify.js';
import { parseFormData } from '../utils.js';

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
      res.write(renderShell(await renderCreate(), ['./src/islands/create-form.js']));
      res.end();
    }

    if (req.method === 'POST') {
      const formData = await parseFormData(req);
      for (const [key, value] of formData) {
        console.log(key, value);
      }

      // TODO: add to db

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(renderShell(await renderIndex(), []));
      res.end();
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
