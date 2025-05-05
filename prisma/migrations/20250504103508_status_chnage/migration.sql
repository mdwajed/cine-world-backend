/*
  Warnings:

  - You are about to drop the column `isPublished` on the `Review` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "ReviewStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "isPublished",
ADD COLUMN     "status" "ReviewStatus" NOT NULL DEFAULT 'PENDING';
