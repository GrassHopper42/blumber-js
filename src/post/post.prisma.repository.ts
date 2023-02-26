import { Post } from './post.model';
import { PostRepository } from './interface/post.repository';
import { PrismaClient } from '@prisma/client';

export const postRepository = (db: PrismaClient): PostRepository => {
  return {
    async create(post: Pick<Post, 'title' | 'content' | 'authorId'>) {
      return await db.post.create({
        data: {
          ...post,
        },
      });
    },

    async find(id: number) {
      return await db.post.findUnique({
        where: {
          id,
        },
      });
    },

    async findAll() {
      return await db.post.findMany();
    },

    async update(id: number, post: Partial<Omit<Post, 'id'>>): Promise<Post> {
      return await db.post.update({
        where: {
          id,
        },
        data: {
          ...post,
        },
      });
    },

    async delete(id: number): Promise<any> {
      return await db.post.delete({
        where: {
          id,
        },
      });
    },
  };
};
