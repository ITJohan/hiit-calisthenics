import fs from 'node:fs/promises';
import pg from 'pg';
const { Pool } = pg;

const password = await fs.readFile(process.env.PGPASSWORD, { encoding: 'utf8' });

const pool = new Pool({ 
  user: process.env.PGUSER,
  password: password,
  database: process.env.PGDATABASE,
  host: process.env.PGHOST
});

/**
 * @param {string} text
 * @param {string[]} [params]
 * @returns {Promise<pg.QueryResult<any>>}
 */
export function query(text, params) {
  return pool.query(text, params);
}
