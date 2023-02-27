import {
  Post as PrismaPost,
  PostVersion as PrismaPostVersion,
} from '@prisma/client';

export interface Post extends PrismaPost {}
export interface PostVersion extends PrismaPostVersion {}
