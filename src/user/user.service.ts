import { FastifyPluginAsync } from 'fastify';
import { UserRepository } from './interface/user.repository';
import { UserService } from './interface/user.service';
import { User } from './user.model';

export const userService: FastifyPluginAsync = async (fastify) => {
  const repo: UserRepository = fastify.userRepository;

  const service: UserService = {
    createUser: async (user: any): Promise<User> => {
      const newUser = await repo.createUser(user);
      return newUser;
    },
    getUser: async (id: number): Promise<User | null> => {
      const user = await repo.getUser(id);
      return user;
    },
    getUserList: async (): Promise<User[]> => {
      const userList = await repo.getUserList();
      return userList;
    },
    updateUser: async (id: number, user: any): Promise<User> => {
      const updatedUser = await repo.updateUser(id, user);
      return updatedUser;
    },
  };

  fastify.decorate('userService', service);
};
