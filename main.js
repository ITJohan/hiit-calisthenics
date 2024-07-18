// @ts-check

import http from 'http';

const PORT = 3000;

const server = http.createServer((req, res) => {
  res.write('hello world\n');
  res.end();
});

server.listen(PORT, () => console.log(`Server is running on port ${PORT}...`));
