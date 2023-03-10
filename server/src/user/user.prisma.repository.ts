import { PrismaClient } from '@prisma/client';
import { UserRepository } from './interface/user.repository';
import { User } from './user.model';

export const userRepository = (prisma: PrismaClient): UserRepository => {
  return {
    create: async (user: any): Promise<User> => {
      const newUser = await prisma.user.create({
        data: {
          ...user,
        },
      });
      return newUser;
    },

    findById: async (id: number): Promise<User | null> => {
      const user = await prisma.user.findUnique({
        where: {
          id: id,
        },
      });
      return user;
    },

    findByEmail: async (email: string): Promise<User | null> => {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      return user;
    },

    findAll: async (): Promise<User[]> => {
      const userList = await prisma.user.findMany();
      return userList;
    },

    update: async (id: number, user: any): Promise<User> => {
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

    delete: async (id: number): Promise<void> => {
      await prisma.user.delete({
        where: {
          id: id,
        },
      });
    },
  };
};
