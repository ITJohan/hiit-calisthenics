import { IncomingMessage, ServerResponse } from 'http';
import { renderIndex } from '../pages/index.js';
import { renderShell } from './shell.js';
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
    res.write(renderShell(renderIndex(), []));
    res.end();
  }

  if (req.url === '/workout' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(renderShell(renderWorkout(), []));
    res.end();
  }

  if (req.url === '/modify' && req.method === 'GET') {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(renderShell(renderModify(), []));
    res.end();
  }

  next();
}
