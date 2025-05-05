/*
  Warnings:

  - You are about to drop the column `passwordResetToken` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordResetToken",
ADD COLUMN     "needPasswordChange" BOOLEAN NOT NULL DEFAULT true;
