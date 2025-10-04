/*
  Warnings:

  - A unique constraint covering the columns `[invitationId]` on the table `BrideGroom` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "BrideGroom_invitationId_key" ON "BrideGroom"("invitationId");
