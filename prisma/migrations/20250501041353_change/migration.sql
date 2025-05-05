/*
  Warnings:

  - You are about to drop the column `mediaId` on the `Purchase` table. All the data in the column will be lost.
  - You are about to drop the column `mediaId` on the `Review` table. All the data in the column will be lost.
  - You are about to drop the column `mediaId` on the `Watchlist` table. All the data in the column will be lost.
  - You are about to drop the `Media` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,movieId]` on the table `Watchlist` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `movieId` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieId` to the `Review` table without a default value. This is not possible if the table is not empty.
  - Added the required column `movieId` to the `Watchlist` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_mediaId_fkey";

-- DropForeignKey
ALTER TABLE "Watchlist" DROP CONSTRAINT "Watchlist_mediaId_fkey";

-- DropIndex
DROP INDEX "Watchlist_userId_mediaId_key";

-- AlterTable
ALTER TABLE "Purchase" DROP COLUMN "mediaId",
ADD COLUMN     "movieId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "mediaId",
ADD COLUMN     "movieId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Watchlist" DROP COLUMN "mediaId",
ADD COLUMN     "movieId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Media";

-- CreateTable
CREATE TABLE "Movie" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "genres" "Genre"[],
    "releaseYear" INTEGER NOT NULL,
    "director" TEXT NOT NULL,
    "cast" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "buyPrice" DOUBLE PRECISION NOT NULL,
    "rentPrice" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "streamingUrl" TEXT NOT NULL,
    "type" "MediaType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Watchlist_userId_movieId_key" ON "Watchlist"("userId", "movieId");

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Watchlist" ADD CONSTRAINT "Watchlist_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
