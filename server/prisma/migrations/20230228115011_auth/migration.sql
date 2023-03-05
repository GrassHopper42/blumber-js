/*
  Warnings:

  - You are about to drop the column `createdAt` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `data` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "sessions_userId_key";

-- AlterTable
ALTER TABLE "sessions" DROP COLUMN "createdAt",
DROP COLUMN "userId",
ADD COLUMN     "data" TEXT NOT NULL;
