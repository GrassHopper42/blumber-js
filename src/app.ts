import Fastify, { FastifyHttpOptions } from 'fastify';
import { Server } from 'http';
const app = (opts: FastifyHttpOptions<Server> | undefined) => Fastify(opts);

export default app;
