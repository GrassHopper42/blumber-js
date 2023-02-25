import { FastifyPluginAsync } from 'fastify';
import { UserRepository } from './interface/user.repository';
import { User } from './user.model';

export const userRepository: FastifyPluginAsync = async (fastify) => {
  const prisma = fastify.db;

  const repo: UserRepository = {
    createUser: async (user: any): Promise<User> => {
      const newUser = await prisma.user.create({
        data: {
          name: user.name,
          email: user.email,
        },
      });
      return newUser;
    },
    getUser: async (id: number): Promise<User | null> => {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    },
    getUserList: async (): Promise<User[]> => {
      const userList = await prisma.user.findMany();
      return userList;
    },
    updateUser: async (id: number, user: any): Promise<User> => {
      const updatedUser = await prisma.user.update({
        where: {
          id: id,
        },
        data: {
          name: user.name,
          email: user.email,
        },
      });
      return updatedUser;
    },
  };

  fastify.decorate('userRepository', repo);
};
