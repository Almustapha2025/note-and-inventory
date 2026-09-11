/*
  Warnings:

  - A unique constraint covering the columns `[clerkId]` on the table `note` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `clerkId` to the `note` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "note" ADD COLUMN     "clerkId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "note_clerkId_key" ON "note"("clerkId");
