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
      published: z.boolean(),
      createdAt: z.string().datetime(),
      updatedAt: z.string().datetime(),
    }),
    404: z.object({
      message: z.string(),
    }),
  },
};
