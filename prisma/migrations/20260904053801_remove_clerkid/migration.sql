/*
  Warnings:

  - You are about to drop the column `clerkId` on the `note` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "note_clerkId_key";

-- AlterTable
ALTER TABLE "note" DROP COLUMN "clerkId";
