/*
  Warnings:

  - Made the column `streamingPlatform` on table `Movie` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Movie" ALTER COLUMN "streamingPlatform" SET NOT NULL;
