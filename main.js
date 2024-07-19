// @ts-check

import http from 'http';
import pg from 'pg';
const { Pool } = pg;

const PORT = 3000;

const server = http.createServer(async (req, res) => {
  const url = new URL(`http://${process.env.HOST ?? 'localhost'}${req.url}`);

  const pool = new Pool({ connectionString: process.env.POSTGRESQL_CONNECTION_STRING });

  try {
    const dbResponse = await pool.query('SELECT * FROM Exercises WHERE exercise_level = $1', [
      url.pathname.substring(1),
    ]);
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.write(JSON.stringify(dbResponse.rows));
    res.end();
  } catch (err) {
    console.error(err);
    res.writeHead(400);
    res.end();
  }
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
