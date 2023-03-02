import { UserService, UserServiceDependencies } from './interface/user.service';
import { User } from './user.model';

export const userService = ({
  userRepository,
}: UserServiceDependencies): UserService => {
  return {
    createUser: async (user: any): Promise<User> => {
      const newUser = await userRepository.create(user);
      return newUser;
    },
    getUser: async (id: number): Promise<User | null> => {
      const user = await userRepository.findById(id);
      return user;
    },
    getUserList: async (): Promise<User[]> => {
      const userList = await userRepository.findAll();
      return userList;
    },
    updateUser: async (id: number, user: any): Promise<User> => {
      const updatedUser = await userRepository.update(id, user);
      return updatedUser;
    },
  };
};
