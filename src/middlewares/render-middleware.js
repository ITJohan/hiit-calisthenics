import { IncomingMessage, ServerResponse } from 'http';
import { renderIndex } from '../pages/index.js';
import { renderShell } from './shell.js';
import { renderCreate } from '../pages/create.js';
import { renderWorkout } from '../pages/workout.js';
import { renderModify } from '../pages/modify.js';
import { parseFormData } from '../utils.js';
import { getExercisesForWorkout, postWorkout } from '../db/db.js';

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
      res.write(renderShell(await renderCreate(), [
        './src/islands/create-workout-form.js',
        './src/islands/create-workout-set.js',
        './src/islands/create-set-exercise.js'
      ]));
      res.end();
    }

    if (req.method === 'POST') {
      const formData = await parseFormData(req);
      await postWorkout(formData);

      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(renderShell(await renderIndex(), []));
      res.end();
    }

    return;
  }

  if (req.url.startsWith('/workout') && req.method === 'GET') {
    const url = new URL(req.url, `http://${req.headers.host}`);

    const workoutId = Number(url.searchParams.get('id'));

    const exercises = await getExercisesForWorkout(workoutId);

    console.log(exercises.rows);

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
