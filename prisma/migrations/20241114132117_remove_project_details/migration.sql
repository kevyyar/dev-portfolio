/*
  Warnings:

  - You are about to drop the column `challenges` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the column `solutions` on the `Project` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Project" DROP COLUMN "challenges",
DROP COLUMN "solutions";
