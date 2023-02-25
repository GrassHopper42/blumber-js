import { FastifyPluginAsync } from 'fastify';
import { postController } from './post.controller.js';
import { postService } from './post.service.js';
import { postRepository } from './post.prisma.repository.js';
import { PostService } from './interface/post.service.js';
import { PostRepository } from './interface/post.repository.js';

declare module 'fastify' {
  interface FastifyInstance {
    postService: PostService;
    postRepository: PostRepository;
  }
}

const postModule: FastifyPluginAsync = async (fastify) => {
  fastify.register(postController, { prefix: '/post' });
  fastify.register(postService);
  fastify.register(postRepository);
};

export default postModule;
