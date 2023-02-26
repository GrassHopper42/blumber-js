import Fastify, { FastifyServerOptions } from 'fastify';
import {
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod';
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
  fastify.setValidatorCompiler(validatorCompiler);
  fastify.setSerializerCompiler(serializerCompiler);

  return fastify;
};
