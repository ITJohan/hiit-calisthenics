import { IncomingMessage } from 'http';

/**
 * @param {IncomingMessage} req
 * @returns {Promise<FormData>}
 */
export function parseFormData(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk) => (body += chunk.toString()));
    req.on('end', () => {
      const parsedData = new URLSearchParams(body);
      const formData = new FormData();

      for (const [key, value] of parsedData) {
        formData.append(key, value);
      }

      resolve(formData);
    });
    req.on('error', (err) => reject(err));
  });
}
