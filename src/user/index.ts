import { FastifyInstance } from 'fastify';
import { UserRepository } from './interface/user.repository';
import { UserService } from './interface/user.service';
import { userController } from './user.controller';
import { userRepository } from './user.prisma.repository';
import { userService } from './user.service';

declare module 'fastify' {
  interface FastifyInstance {
    userService: UserService;
    userRepository: UserRepository;
  }
}

const userModule = async (fastify: FastifyInstance) => {
  fastify.register(userRepository);
  fastify.register(userService);
  fastify.register(userController);
};

export default userModule;
