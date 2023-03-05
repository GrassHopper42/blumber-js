import { FastifyPluginAsync, FastifyRequest } from 'fastify';
import { UserService } from './interface/user.service';

type GetUsersRequest = FastifyRequest<{
  Params: {
    id: number;
  };
}>;

export const userController: FastifyPluginAsync = async (fastify) => {
  const service: UserService = fastify.userService;

  fastify.get('/', async (_request, reply) => {
    const userList = await service.getUserList();
    reply.send(userList);
  });

  fastify.get('/:id', async (request: GetUsersRequest, reply) => {
    const { id } = request.params;
    const user = await service.getUser(id);
    reply.send(user);
  });

  fastify.post('/', async (request, reply) => {
    const { body } = request;
    const user = await service.createUser(body);
    reply.send(user);
  });

  fastify.put('/:id', async (request: GetUsersRequest, reply) => {
    const { id } = request.params;
    const { body } = request;
    const user = await service.updateUser(id, body);
    reply.send(user);
  });
};
