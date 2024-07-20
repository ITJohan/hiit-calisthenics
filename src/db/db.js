import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({ connectionString: process.env.POSTGRESQL_CONNECTION_STRING });

/**
 * @param {string} text
 * @param {string[]} [params]
 * @returns {Promise<pg.QueryResult<any>>}
 */
export function query(text, params) {
  return pool.query(text, params);
}
