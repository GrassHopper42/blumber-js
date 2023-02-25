import { User } from '../user.model.js';

export type UserRepository = {
  createUser(user: any): Promise<User>;
  getUser(id: number): Promise<User | null>;
  getUserList(): Promise<User[]>;
  updateUser(id: number, user: any): Promise<User>;
};
