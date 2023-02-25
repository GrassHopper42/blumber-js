import { FastifyPluginAsync } from 'fastify';
import { postController } from './post.controller';
import { postService } from './post.service';
import { postRepository } from './post.prisma.repository';
import { PostService } from './interface/post.service';
import { PostRepository } from './interface/post.repository';

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
