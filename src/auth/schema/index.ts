import z from 'zod';

export const authSchema = {
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
  response: {
    200: z.void(),
    400: z.void(),
    401: z.object({
      message: z.string(),
    }),
  },
};

export const changePasswordSchema = {
  body: z.object({
    oldPassword: z.string(),
    newPassword: z.string(),
  }),
  response: {
    200: z.void(),
    400: z.void(),
  },
};
