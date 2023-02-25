import { User } from '../user.model.js';

export type UserRepository = {
  create(user: any): Promise<User>;
  find(id: number): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: number, user: any): Promise<User>;
};
