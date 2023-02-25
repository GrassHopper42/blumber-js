import { FastifyPluginAsync } from 'fastify';
import { PostService } from './interface/post.service.js';

export const postService: FastifyPluginAsync = async (fastify) => {
  const { postRepository } = fastify;

  const service: PostService = {
    async createPost(post: any) {
      return await postRepository.createPost(post);
    },

    async getPost(id: number) {
      return await postRepository.getPost(id);
    },

    async getPostList() {
      return await postRepository.getAllPosts();
    },

    async updatePost(id: number, post: any) {
      return await postRepository.updatePost(id, post);
    },
  };

  fastify.decorate('postService', service);
};
