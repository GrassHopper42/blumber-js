import { ZodFastifyPluginAsync } from 'src/lib/types';
import {
  createSchema,
  deleteSchema,
  findByIdSchema,
  getAllVersionsSchema,
  getVersionSchema,
  updateSchema,
} from './schema';

export const postController: ZodFastifyPluginAsync = async (fastify) => {
  const { postService } = fastify;

  //create a post
  fastify.post('/', { schema: createSchema }, async (request, reply) => {
    try {
      await postService.createPost(request.body);
      reply.code(201);
    } catch (error) {
      reply.code(400).send(error);
    }
  });

  //get all posts
  fastify.get('/', async (_request, reply) => {
    const posts = postService.getPostList();
    reply.send(posts);
  });

  //get a post
  fastify.get('/:id', { schema: findByIdSchema }, async (request, reply) => {
    const post = await postService.getPost(request.params.id);
    if (post) {
      reply.code(200).send({
        ...post,
        createdAt: post.createdAt.toString(),
      });
    } else {
      reply.code(404).send({ message: 'Post not found' });
    }
  });

  fastify.get(
    '/:id/version',
    { schema: getAllVersionsSchema },
    async (request, reply) => {
      const versions = await postService.getAllVersions(request.params.id);
      reply.send(
        versions.map((version) => ({
          ...version,
          createdAt: version.createdAt.toString(),
        })),
      );
    },
  );

  fastify.get(
    '/:id/version/:version',
    { schema: getVersionSchema },
    async (request, reply) => {
      const version = await postService.getVersion(
        request.params.id,
        request.params.version,
      );
      if (version) {
        reply.code(200).send({
          ...version,
          createdAt: version.createdAt.toString(),
        });
      } else {
        reply.code(404).send({ message: 'Version not found' });
      }
    },
  );

  //update a post
  fastify.put('/:id', { schema: updateSchema }, async (request, reply) => {
    await postService.updatePost(request.params.id, request.body);
    reply.code(200);
  });

  //delete a post
  fastify.delete('/:id', { schema: deleteSchema }, async (request, reply) => {
    await postService.deletePost(request.params.id);
    reply.code(204).send();
  });
};
