import z from 'zod';

export const findByIdSchema = {
  params: z.object({
    id: z.number(),
  }),
  response: {
    200: z.object({
      id: z.number(),
      title: z.string(),
      content: z.string(),
      authorId: z.number(),
      createdAt: z.string().datetime(),
    }),
    404: z.object({
      message: z.string(),
    }),
  },
};

export const getAllVersionsSchema = {
  params: z.object({
    id: z.number(),
  }),
  response: {
    200: z.array(
      z.object({
        version: z.number(),
        content: z.string(),
        createdAt: z.string().datetime(),
      }),
    ),
  },
};

export const getVersionSchema = {
  params: z.object({
    id: z.number(),
    version: z.number(),
  }),
  response: {
    200: z.object({
      version: z.number(),
      content: z.string(),
      createdAt: z.string().datetime(),
    }),
    404: z.object({
      message: z.string(),
    }),
  },
};
