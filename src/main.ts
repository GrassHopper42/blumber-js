import AutoLoad from '@fastify/autoload';
import path from 'path';
import { fileURLToPath } from 'url';
import { logger } from './utils/logger.js';
import app from './app.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const server = app({
  logger,
});

server.register(AutoLoad, {
  dir: path.join(__dirname, 'plugins'),
  forceESM: true,
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});
