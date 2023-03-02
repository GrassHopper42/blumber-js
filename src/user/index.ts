import { FastifyInstance } from 'fastify';
import { UserRepository } from './interface/user.repository';
import { UserService } from './interface/user.service';
import { userController } from './user.controller';
import { userRepository } from './user.prisma.repository';
import { userService } from './user.service';
import fp from 'fastify-plugin';

declare module 'fastify' {
  interface FastifyInstance {
    userService: UserService;
    userRepository: UserRepository;
  }
}

const userRepositoryPlugin = fp(async (fastify) => {
  fastify.decorate('userRepository', userRepository(fastify.db));
});

const userServicePlugin = fp(async (fastify) => {
  fastify.decorate('userService', userService(fastify));
});

const userModule = fp(async (fastify: FastifyInstance) => {
  fastify.log.debug('Registering user module');
  fastify.register(userRepositoryPlugin);
  fastify.register(userServicePlugin);
  fastify.register(userController, { prefix: '/user' });
});

export default userModule;
