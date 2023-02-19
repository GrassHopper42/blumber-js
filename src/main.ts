import Fastify from 'fastify';

const server = Fastify({
  logger: true,
});

server.get('/', async (request, reply) => {
  return 'Hello World!';
});

server.listen({ port: 3000 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  server.log.info(`server listening on ${address}`);
});
