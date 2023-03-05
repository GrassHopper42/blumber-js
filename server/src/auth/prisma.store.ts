import { SessionStore } from '@fastify/session';
import { PrismaClient } from '@prisma/client';
import { Session } from 'fastify';

const prismaStore = (prisma: PrismaClient): SessionStore => {
  return {
    async get(sessionId: string) {
      const session = await prisma.session.findUnique({
        where: {
          id: sessionId,
        },
      });
      if (session) {
        return JSON.parse(session.data);
      }
      return null;
    },
    async set(sessionId: string, session: Session) {
      await prisma.session.upsert({
        where: {
          id: sessionId,
        },
        update: {
          data: JSON.stringify(session),
        },
        create: {
          id: sessionId,
          data: JSON.stringify(session),
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
        },
      });
    },
    async destroy(sessionId: string) {
      await prisma.session.delete({
        where: {
          id: sessionId,
        },
      });
    },
  };
};

export default prismaStore;
