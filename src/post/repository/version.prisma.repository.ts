import { VersionRepository } from '../interface/version.repository';
import { PostVersion } from '../post.model';
import { PrismaClient } from '@prisma/client';

export const versionRepository = (prisma: PrismaClient): VersionRepository => {
  return {
    async create(data: {
      content: string;
      postId: number;
      version?: number;
    }): Promise<PostVersion> {
      return await prisma.postVersion.create({
        data,
      });
    },

    async findByPostIdAndVersion(postId_version: {
      postId: number;
      version: number;
    }): Promise<PostVersion | null> {
      return await prisma.postVersion.findUnique({
        where: {
          postId_version,
        },
      });
    },

    async getLastVersion(postId: number): Promise<PostVersion | null> {
      return await prisma.postVersion.findFirst({
        where: {
          postId,
        },
        orderBy: {
          version: 'desc',
        },
      });
    },

    async findAll(): Promise<PostVersion[]> {
      return await prisma.postVersion.findMany();
    },

    async findAllByPostId(postId: number): Promise<PostVersion[]> {
      return await prisma.postVersion.findMany({
        where: {
          postId,
        },
      });
    },

    async update(id: number, version: number, data: any): Promise<PostVersion> {
      return await prisma.postVersion.update({
        where: {
          postId_version: {
            postId: id,
            version,
          },
        },
        data: {
          ...data,
        },
      });
    },
  };
};
