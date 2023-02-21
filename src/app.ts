import Fastify, { FastifyServerOptions } from 'fastify';
export default (opts?: FastifyServerOptions) => {
  const fastify = Fastify(opts);

  return fastify;
};
