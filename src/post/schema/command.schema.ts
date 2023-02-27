import z from 'zod';

export const createSchema = {
  body: z.object({
    title: z.string(),
    content: z.string(),
    authorId: z.number(),
  }),
  response: {
    201: z.object({}),
    400: z.unknown(),
  },
};

export const updateSchema = {
  params: z.object({
    id: z.number(),
  }),
  body: z.object({
    title: z.string().optional(),
    content: z.string().optional(),
  }),
  response: {
    200: z.null(),
    400: z.unknown(),
  },
};

export const deleteSchema = {
  params: z.object({
    id: z.number(),
  }),
  response: {
    204: z.null(),
  },
};
