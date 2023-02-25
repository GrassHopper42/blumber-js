import { postController } from './post.controller';
import { postService } from './post.service';
import { postRepository } from './post.prisma.repository';
import { PostService } from './interface/post.service';
import { PostRepository } from './interface/post.repository';
import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';

declare module 'fastify' {
  interface FastifyInstance {
    postService: PostService;
    postRepository: PostRepository;
  }
}

const postRepositoryPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorate('postRepository', postRepository(fastify.db));
});

const postServicePlugin = fp(async (fastify) => {
  fastify.decorate('postService', postService(fastify.postRepository));
});

const postModule = fp(async (fastify) => {
  fastify.register(postController, { prefix: '/post' });
  fastify.register(postRepositoryPlugin);
  fastify.register(postServicePlugin);
});

export default postModule;
