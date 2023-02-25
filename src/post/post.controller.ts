import { FastifyPluginAsync, FastifyRequest } from 'fastify';

type GetPostRequest = FastifyRequest<{
  Params: {
    id: number;
  };
}>;

export const postController: FastifyPluginAsync = async (fastify) => {
  const { postService } = fastify;

  //create a post
  fastify.post('/', async (request, reply) => {
    const post = postService.createPost(request.body);
    reply.code(201).send(post);
  });

  //get all posts
  fastify.get('/', async (_request, reply) => {
    const posts = postService.getPostList();
    reply.send(posts);
  });

  //get a post
  fastify.get('/:id', async (request: GetPostRequest, reply) => {
    const post = postService.getPost(request.params.id);
    reply.send(post);
  });

  //update a post
  fastify.put('/:id', async (_request, reply) => {
    const post = {};
    reply.send(post);
  });

  //delete a post
  fastify.delete('/:id', async (_request, reply) => {
    reply.code(204).send();
  });
};
