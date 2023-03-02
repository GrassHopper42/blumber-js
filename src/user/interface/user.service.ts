import { User } from '../user.model.js';
import { UserRepository } from './user.repository.js';

export interface UserServiceDependencies {
  userRepository: UserRepository;
}

export type UserService = {
  createUser(user: any): Promise<User>;
  getUser(id: number): Promise<User | null>;
  getUserList(): Promise<User[]>;
  updateUser(id: number, user: any): Promise<User>;
};
