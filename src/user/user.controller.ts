import { FastifyPluginAsync, FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from './interface/user.service';

type GetUsersRequest = FastifyRequest<{
  Params: {
    id: number;
  };
}>;

export const userController: FastifyPluginAsync = async (fastify) => {
  const service: UserService = fastify.userService;

  fastify.get('/users', async (_request, reply) => {
    const userList = await service.getUserList();
    reply.send(userList);
  });

  fastify.get('/users/:id', async (request: GetUsersRequest, reply) => {
    const { id } = request.params;
    const user = await service.getUser(id);
    reply.send(user);
  });

  fastify.post('/users', async (request, reply) => {
    const { body } = request;
    const user = await service.createUser(body);
    reply.send(user);
  });

  fastify.put('/users/:id', async (request: GetUsersRequest, reply) => {
    const { id } = request.params;
    const { body } = request;
    const user = await service.updateUser(id, body);
    reply.send(user);
  });
};
