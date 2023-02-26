import { Post } from '@prisma/client';
import { PostRepository } from './interface/post.repository';
import { PostService } from './interface/post.service';

export const postService = (postRepository: PostRepository): PostService => {
  return {
    async createPost(post: Pick<Post, 'title' | 'content' | 'authorId'>) {
      return await postRepository.create(post);
    },

    async getPost(id: number) {
      return await postRepository.find(id);
    },

    async getPostList() {
      return await postRepository.findAll();
    },

    async updatePost(id: number, post: Partial<Omit<Post, 'id'>>) {
      return await postRepository.update(id, post);
    },

    async deletePost(id: number) {
      return await postRepository.delete(id);
    },
  };
};
