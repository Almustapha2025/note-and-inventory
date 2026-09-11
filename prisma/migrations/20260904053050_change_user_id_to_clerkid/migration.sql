/*
  Warnings:

  - You are about to drop the column `clerkid` on the `note` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[clerkId]` on the table `note` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `note` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "note_clerkid_key";

-- AlterTable
ALTER TABLE "note" DROP COLUMN "clerkid",
ADD COLUMN     "clerkId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "note_clerkId_key" ON "note"("clerkId");
