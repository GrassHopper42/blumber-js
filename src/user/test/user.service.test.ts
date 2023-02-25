import { afterEach, beforeAll, describe, expect, it, vi } from 'vitest';
import { UserRepository } from '../interface/user.repository';
import { UserService } from '../interface/user.service';
import { userService } from '../user.service';

describe('UserService Test', () => {
  let mockRepo: UserRepository;
  let service: UserService;

  beforeAll(async () => {
    mockRepo = {
      create: vi.fn(),
      find: vi.fn(),
      findAll: vi.fn(),
      update: vi.fn(),
    };
    service = userService(mockRepo);
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should create a user', async () => {
    // given
    const user = {
      name: 'John Doe',
      email: 'test@test.com',
    };
    const expectedUser = {
      id: 1,
      ...user,
    };
    mockRepo.create = vi.fn().mockResolvedValueOnce(expectedUser);

    // when
    const result = await service.createUser(user);

    // then
    expect(result).toEqual(expectedUser);
    expect(mockRepo.create).toBeCalledWith(user);
  });

  it('should return a user', async () => {
    // given
    mockRepo.find = vi.fn().mockResolvedValueOnce({
      id: 1,
      name: 'John Doe',
      email: 'test@test.com',
    });

    // when
    const user = await service.getUser(1);

    // then
    expect(mockRepo.find).toBeCalledWith(1);
    expect(user).toEqual({
      id: 1,
      name: 'John Doe',
      email: 'test@test.com',
    });
  });

  it('should return a list of users', async () => {
    // given
    mockRepo.findAll = vi.fn().mockResolvedValueOnce([
      {
        id: 1,
        name: 'John Doe',
        email: 'test1@test.com',
      },
      {
        id: 2,
        name: 'Ryan Gosling',
        email: 'test2@test.com',
      },
    ]);

    // when
    const userList = await service.getUserList();

    // then
    expect(mockRepo.findAll).toBeCalled();
    expect(userList).toEqual([
      {
        id: 1,
        name: 'John Doe',
        email: 'test1@test.com',
      },
      {
        id: 2,
        name: 'Ryan Gosling',
        email: 'test2@test.com',
      },
    ]);
  });

  it('should update a user', async () => {
    // given
    const user = {
      name: 'John Doe',
      email: 'test@test.com',
    };
    const expectedUser = {
      id: 1,
      ...user,
    };
    mockRepo.update = vi.fn().mockResolvedValueOnce(expectedUser);

    // when
    const result = await service.updateUser(1, user);

    // then
    expect(result).toEqual(expectedUser);
    expect(mockRepo.update).toBeCalledWith(1, user);
  });
});
