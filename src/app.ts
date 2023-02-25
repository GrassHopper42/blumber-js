import Fastify, { FastifyServerOptions } from 'fastify';
import postModule from './post';
import userModule from './user';

export default (opts?: FastifyServerOptions) => {
  const fastify = Fastify(opts);

  fastify.register(postModule);
  fastify.register(userModule);

  return fastify;
};
