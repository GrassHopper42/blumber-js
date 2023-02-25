import Fastify, { FastifyServerOptions } from 'fastify';
import prismaPlugin from './plugins/prisma';
// import AutoLoad from '@fastify/autoload';
// import path from 'path';
// import { fileURLToPath } from 'url';

export default (opts?: FastifyServerOptions) => {
  const fastify = Fastify(opts);

  // const __filename = fileURLToPath(import.meta.url);
  // const __dirname = path.dirname(__filename);
  //
  // fastify.register(AutoLoad, {
  //   dir: path.join(__dirname, 'plugins'),
  //   forceESM: true,
  // });
  fastify.register(prismaPlugin);

  return fastify;
};
