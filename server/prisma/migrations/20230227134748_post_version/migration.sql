/*
  Warnings:

  - You are about to drop the column `content` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `version` on the `Post` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `User` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'BETA', 'PUBLISHED');

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "content",
DROP COLUMN "published",
DROP COLUMN "updatedAt",
DROP COLUMN "version",
ADD COLUMN     "status" "PostStatus" NOT NULL DEFAULT 'DRAFT';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "updatedAt";

-- CreateTable
CREATE TABLE "PostVersion" (
    "content" TEXT NOT NULL,
    "version" INTEGER NOT NULL DEFAULT 1,
    "postId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PostVersion_pkey" PRIMARY KEY ("postId","version")
);

-- AddForeignKey
ALTER TABLE "PostVersion" ADD CONSTRAINT "PostVersion_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
