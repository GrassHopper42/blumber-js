import { Post } from './post.model';
import { FastifyPluginAsync } from 'fastify';
import { PostRepository } from './interface/post.repository';

export const postRepository: FastifyPluginAsync = async (fastify) => {
  const { db } = fastify;

  const repository: PostRepository = {
    async createPost(post: any) {
      return await db.post.create({
        data: {
          ...post,
        },
      });
    },

    async getPost(id: number) {
      return await db.post.findUnique({
        where: {
          id,
        },
      });
    },

    async getAllPosts() {
      return await db.post.findMany();
    },

    async updatePost(id: number, post: any): Promise<Post> {
      return await db.post.update({
        where: {
          id,
        },
        data: {
          ...post,
        },
      });
    },

    async deletePost(id: number): Promise<any> {
      return await db.post.delete({
        where: {
          id,
        },
      });
    },
  };

  fastify.decorate('postRepository', repository);
};
