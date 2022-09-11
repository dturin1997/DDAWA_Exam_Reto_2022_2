/*
  Warnings:

  - You are about to drop the column `genreId` on the `movies` table. All the data in the column will be lost.
  - Added the required column `movieId` to the `genres` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "movies" DROP CONSTRAINT "movies_genreId_fkey";

-- AlterTable
ALTER TABLE "genres" ADD COLUMN     "movieId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "movies" DROP COLUMN "genreId";

-- AddForeignKey
ALTER TABLE "genres" ADD CONSTRAINT "genres_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
