import { logger } from './utils/logger.js';
import app from './app.js';
import postModule from './post/index.js';
import userModule from './user/index.js';

const server = app({
  logger,
});

server.register(postModule);
server.register(userModule);

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});
