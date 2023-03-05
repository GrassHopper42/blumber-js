import bcrypt from 'bcrypt';
import { AuthService, AuthServiceDeps } from './interface/auth.service';

export const authService = ({
  userRepository,
  log,
}: AuthServiceDeps): AuthService => {
  const SALT_ROUNDS = 10;

  return {
    login: async (email: string, password: string) => {
      const user = await userRepository.findByEmail(email);
      if (!user) {
        throw new Error('Invalid email or password');
      }
      await bcrypt.hash(password, SALT_ROUNDS);
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error('Invalid email or password');
      }
      return user.id;
    },

    register: async (email: string, password: string) => {
      const isExist = !!(await userRepository.findByEmail(email));
      if (isExist) {
        log.debug(`User with email ${email} already exists`);
        throw new Error('Email already exists');
      }
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      log.debug(`Creating user with email ${email}`);
      const user = await userRepository.create({
        email,
        password: hashedPassword,
      });
      log.debug(`User with email ${email} created`);
      return user.id;
    },

    changePassword: async (
      userId: number,
      oldPassword: string,
      newPassword: string,
    ) => {
      const user = await userRepository.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      const hashedOldPassword = await bcrypt.hash(oldPassword, SALT_ROUNDS);
      const valid = await bcrypt.compare(hashedOldPassword, user.password);
      if (!valid) {
        throw new Error('Invalid password');
      }
      const hashedNewPassword = await bcrypt.hash(newPassword, SALT_ROUNDS);
      await userRepository.update(userId, {
        password: hashedNewPassword,
      });
    },

    unregister: async (userId: number) => {
      await userRepository.delete(userId);
    },
  };
};
