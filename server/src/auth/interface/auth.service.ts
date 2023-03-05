import { FastifyBaseLogger } from 'fastify';
import { UserRepository } from 'src/user/interface/user.repository';

export interface AuthServiceDeps {
  userRepository: UserRepository;
  log: FastifyBaseLogger;
}

export interface AuthService {
  login(email: string, password: string): Promise<Number>;
  register(email: string, password: string): Promise<Number>;
  changePassword(
    userId: number,
    oldPassword: string,
    newPassword: string,
  ): Promise<void>;
  unregister(userId: number): Promise<void>;
}
