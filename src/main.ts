import { logger } from './lib/logger.js';
import app from './app.js';
import postModule from './post/index.js';
import userModule from './user/index.js';
import { ZodTypeProvider } from 'fastify-type-provider-zod';

const server = app({
  logger,
}).withTypeProvider<ZodTypeProvider>();

server.register(postModule);
server.register(userModule);

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});
