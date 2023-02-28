import { User } from '../user.model.js';

export type UserRepository = {
  create(user: any): Promise<User>;
  findById(id: number): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(id: number, user: any): Promise<User>;
  delete(id: number): Promise<void>;
};
