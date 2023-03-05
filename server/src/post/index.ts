import { postController } from './post.controller';
import { postService } from './post.service';
import { postRepository } from './repository/post.prisma.repository';
import { PostService } from './interface/post.service';
import { PostRepository } from './interface/post.repository';
import fp from 'fastify-plugin';
import { FastifyPluginAsync } from 'fastify';
import { VersionRepository } from './interface/version.repository';
import { versionRepository } from './repository/version.prisma.repository';

declare module 'fastify' {
  interface FastifyInstance {
    postService: PostService;
    postRepository: PostRepository;
    versionRepository: VersionRepository;
  }
}

const postRepositoryPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorate('postRepository', postRepository(fastify.db));
});

const versionRepositoryPlugin: FastifyPluginAsync = fp(async (fastify) => {
  fastify.decorate('versionRepository', versionRepository(fastify.db));
});

const postServicePlugin = fp(async (fastify) => {
  fastify.decorate('postService', postService(fastify));
});

const postModule = fp(async (fastify) => {
  fastify.log.debug('Registering post module');
  fastify.register(postController, { prefix: '/post' });
  fastify.register(postRepositoryPlugin);
  fastify.register(versionRepositoryPlugin);
  fastify.register(postServicePlugin);
});

export default postModule;
