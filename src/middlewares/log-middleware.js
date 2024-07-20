import { IncomingMessage, ServerResponse } from 'http';

/**
 *
 * @param {IncomingMessage} req
 * @param {ServerResponse} _res
 * @param {() => void} next
 */
export default async function logMiddleware(req, _res, next) {
  console.log(`Request for ${req.url}`);
  next();
}
