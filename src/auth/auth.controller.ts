import { ZodFastifyPluginAsync } from 'src/lib/types';
import { authSchema, changePasswordSchema } from './schema';

const authController: ZodFastifyPluginAsync = async (fastify) => {
  fastify.post('/login', { schema: authSchema }, async (request, reply) => {
    const { email, password } = request.body;
    try {
      const userId = await fastify.authService.login(email, password);
      request.session.set('userId', userId);
      reply.status(200).setCookie('session', request.session.sessionId);
    } catch (error: any) {
      reply.status(401).send(error.message);
    }
  });

  fastify.post(
    '/register',
    { schema: authSchema, logLevel: 'debug' },
    async (request, reply) => {
      const { email, password } = request.body;
      try {
        const userId = await fastify.authService.register(email, password);
        request.session.set('userId', userId);
        request.session.save();
        reply.status(200).setCookie('session', request.session.sessionId);
        return;
      } catch (error: any) {
        fastify.log.debug(`Error registering user with email ${email}`);
        fastify.log.error(error);
        reply.status(400).send(error.message);
      }
    },
  );

  fastify.post('/unregister', async (request, reply) => {
    try {
      await fastify.authService.unregister(request.session.get('userId'));
      await request.session.destroy();
      await reply.clearCookie('session');
      reply.status(200);
    } catch (error: any) {
      reply.status(400).send(error.message);
    }
  });

  fastify.post(
    '/change-password',
    { schema: changePasswordSchema },
    async (request, reply) => {
      const { oldPassword, newPassword } = request.body;
      try {
        await fastify.authService.changePassword(
          request.session.get('userId'),
          oldPassword,
          newPassword,
        );
        reply.status(200);
      } catch (error: any) {
        reply.status(400).send(error.message);
      }
    },
  );

  fastify.get('/logout', async (request, reply) => {
    await request.session.destroy();
    await reply.clearCookie('session');
    reply.status(200);
  });
};

export default authController;
