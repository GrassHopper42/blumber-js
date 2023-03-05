/*
  Warnings:

  - Made the column `content` on table `Post` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `password` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1,
ALTER COLUMN "content" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "password" TEXT NOT NULL;
