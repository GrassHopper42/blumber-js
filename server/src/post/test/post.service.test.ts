import { beforeEach, describe, expect, it, vi } from 'vitest';
import { mock } from 'vitest-mock-extended';
import { PostRepository } from '../interface/post.repository';
import { PostService } from '../interface/post.service';
import { VersionRepository } from '../interface/version.repository';
import { postService } from '../post.service';

describe('PostService Test', () => {
  let postRepo: PostRepository = mock<PostRepository>();
  let versionRepo: VersionRepository = mock<VersionRepository>();
  let service: PostService = postService(postRepo, versionRepo);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('Create Test', () => {
    it('should create post version', async () => {
      // given
      const post = {
        title: 'Post Title',
        content: 'Post Content',
        authorId: 1,
      };
      postRepo.create = vi.fn().mockResolvedValueOnce({
        id: 1,
      });

      // when
      await service.createPost(post);

      // then
      expect(postRepo.create).toBeCalledWith({
        authorId: 1,
        title: 'Post Title',
      });
      expect(versionRepo.create).toBeCalledWith({
        postId: 1,
        content: post.content,
      });
    });
  });

  describe('Read Test', () => {
    it('should get all posts', async () => {
      const expected = [
        {
          id: 1,
          title: 'Post Title',
        },
      ];
      postRepo.findAll = vi.fn().mockResolvedValueOnce(expected);

      const actual = await service.getPostList();

      expect(actual).toEqual(expected);
      expect(postRepo.findAll).toBeCalled();
    });

    it('should get a post with lastVersion', async () => {
      // given
      const postId = 1;
      const expected = {
        id: 1,
        title: 'Post Title',
        content: 'Post Content',
      };
      postRepo.findById = vi.fn().mockResolvedValueOnce({
        id: 1,
        title: 'Post Title',
      });
      versionRepo.getLastVersion = vi.fn().mockResolvedValueOnce({
        content: 'Post Content',
      });

      // when
      const actual = await service.getPost(postId);

      // then
      expect(actual).toEqual(expected);
      expect(postRepo.findById).toBeCalledWith(postId);
      expect(versionRepo.getLastVersion).toBeCalledWith(postId);
    });
  });

  describe('Update Test', () => {
    it('should update title and should not update version', async () => {
      // given
      const postId = 1;
      const post = {
        title: 'Post Title',
      };
      const expected = {
        id: 1,
        ...post,
      };
      postRepo.update = vi.fn().mockResolvedValueOnce(expected);

      // when
      await service.updatePost(postId, post);

      // then
      expect(postRepo.update).toBeCalledWith(postId, post);
      expect(versionRepo.create).not.toBeCalled();
    });

    it('should update title and content and should create version', async () => {
      // given
      const postId = 1;
      const post = {
        title: 'Post Title',
        content: 'Post Content',
      };
      const expected = {
        id: 1,
        ...post,
      };
      postRepo.update = vi.fn().mockResolvedValueOnce(expected);
      versionRepo.getLastVersion = vi.fn().mockResolvedValueOnce({
        content: 'Post Content',
        version: 1,
      });
      versionRepo.create = vi.fn().mockResolvedValueOnce({
        id: 1,
        postId: 1,
        content: 'Post Content',
        version: 2,
      });

      // when
      await service.updatePost(postId, post);

      // then
      expect(postRepo.update).toBeCalledWith(postId, post);
      expect(versionRepo.create).toBeCalledWith({
        postId,
        content: post.content,
        version: 2,
      });
    });

    it('should update version and should not update title', async () => {
      // given
      const postId = 1;
      const post = {
        content: 'Post Content1',
      };
      versionRepo.getLastVersion = vi.fn().mockResolvedValueOnce({
        content: 'Post Content1',
        version: 1,
      });
      versionRepo.create = vi.fn().mockResolvedValueOnce({
        id: 1,
        postId: 1,
        content: 'Post Content2',
        version: 2,
      });

      // when
      await service.updatePost(postId, post);

      // then
      expect(postRepo.update).not.toBeCalled();
      expect(versionRepo.create).toBeCalledWith({
        postId,
        content: post.content,
        version: 2,
      });
    });
  });
});
