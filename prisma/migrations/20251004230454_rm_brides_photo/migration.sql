/*
  Warnings:

  - You are about to drop the column `photoBride` on the `BrideGroom` table. All the data in the column will be lost.
  - You are about to drop the column `photoGroom` on the `BrideGroom` table. All the data in the column will be lost.
  - Made the column `brideParent` on table `BrideGroom` required. This step will fail if there are existing NULL values in that column.
  - Made the column `groomParent` on table `BrideGroom` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "BrideGroom" DROP COLUMN "photoBride",
DROP COLUMN "photoGroom",
ALTER COLUMN "brideParent" SET NOT NULL,
ALTER COLUMN "groomParent" SET NOT NULL;
