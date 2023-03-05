import fp from 'fastify-plugin';
import { AuthService } from './interface/auth.service';
import prismaStore from './prisma.store';
import { authService } from './auth.service';
import authController from './auth.controller';
import fastifyCookie from '@fastify/cookie';
import fastifySession from '@fastify/session';
import { FastifyPluginAsync } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    authService: AuthService;
  }
}

const authServicePlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorate('authService', authService(fastify));
});

const authModule = fp(async (fastify) => {
  fastify.log.debug('Registering auth module');
  fastify.register(fastifyCookie);
  fastify.register(fastifySession, {
    secret: 'xxUkk0JBNwxgFZ3UBuISnTZpSvOJC8BK',
    cookie: {
      // secure: process.env.NODE_ENV === 'production',
      // httpOnly: process.env.NODE_ENV === 'production',
      // sameSite: 'lax',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    },
    store: prismaStore(fastify.db),
  });

  fastify.register(authServicePlugin);
  fastify.register(authController, { prefix: '/auth' });
});

export default authModule;
