import { UserRepository } from './interface/user.repository';
import { UserService } from './interface/user.service';
import { User } from './user.model';

export const userService = (repo: UserRepository): UserService => {
  return {
    createUser: async (user: any): Promise<User> => {
      const newUser = await repo.create(user);
      return newUser;
    },
    getUser: async (id: number): Promise<User | null> => {
      const user = await repo.find(id);
      return user;
    },
    getUserList: async (): Promise<User[]> => {
      const userList = await repo.findAll();
      return userList;
    },
    updateUser: async (id: number, user: any): Promise<User> => {
      const updatedUser = await repo.update(id, user);
      return updatedUser;
    },
  };
};
