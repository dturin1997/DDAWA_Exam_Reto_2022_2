-- DropForeignKey
ALTER TABLE "charactersonmovies" DROP CONSTRAINT "charactersonmovies_characterId_fkey";

-- DropForeignKey
ALTER TABLE "charactersonmovies" DROP CONSTRAINT "charactersonmovies_movieId_fkey";

-- DropForeignKey
ALTER TABLE "genres" DROP CONSTRAINT "genres_movieId_fkey";

-- AddForeignKey
ALTER TABLE "genres" ADD CONSTRAINT "genres_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charactersonmovies" ADD CONSTRAINT "charactersonmovies_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charactersonmovies" ADD CONSTRAINT "charactersonmovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;
