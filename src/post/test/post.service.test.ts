import { beforeAll, describe, expect, it, vi } from 'vitest';
import { PostRepository } from '../interface/post.repository';
import { PostService } from '../interface/post.service';
import { postService } from '../post.service';

describe('PostService Test', () => {
  let service: PostService;
  let mockRepo: PostRepository;

  beforeAll(() => {
    mockRepo = {
      create: vi.fn(),
      delete: vi.fn(),
      findAll: vi.fn(),
      find: vi.fn(),
      update: vi.fn(),
    };
    service = postService(mockRepo);
  });

  it('should create a post', async () => {
    const post = {
      title: 'Post Title',
      content: 'Post Content',
    };
    const expected = {
      id: 1,
      ...post,
    };
    mockRepo.create = vi.fn().mockResolvedValueOnce(expected);

    const actual = await service.createPost(post);

    expect(actual).toEqual(expected);
    expect(mockRepo.create).toBeCalledWith(post);
  });

  it('should get all posts', async () => {
    const expected = [
      {
        id: 1,
        title: 'Post Title',
        content: 'Post Content',
      },
    ];
    mockRepo.findAll = vi.fn().mockResolvedValueOnce(expected);

    const actual = await service.getPostList();

    expect(actual).toEqual(expected);
    expect(mockRepo.findAll).toBeCalled();
  });

  it('should get a post', async () => {
    const postId = 1;
    const expected = {
      id: 1,
      title: 'Post Title',
      content: 'Post Content',
    };
    mockRepo.find = vi.fn().mockResolvedValueOnce(expected);

    const actual = await service.getPost(postId);

    expect(actual).toEqual(expected);
    expect(mockRepo.find).toBeCalledWith(postId);
  });

  it('should update a post', async () => {
    const postId = 1;
    const post = {
      title: 'Post Title',
      content: 'Post Content',
    };
    const expected = {
      id: 1,
      ...post,
    };
    mockRepo.update = vi.fn().mockResolvedValueOnce(expected);

    const actual = await service.updatePost(postId, post);

    expect(actual).toEqual(expected);
    expect(mockRepo.update).toBeCalledWith(postId, post);
  });
});
