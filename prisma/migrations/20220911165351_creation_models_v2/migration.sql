/*
  Warnings:

  - You are about to drop the `CharactersOnMovies` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Genre` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Movie` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CharactersOnMovies" DROP CONSTRAINT "CharactersOnMovies_characterId_fkey";

-- DropForeignKey
ALTER TABLE "CharactersOnMovies" DROP CONSTRAINT "CharactersOnMovies_movieId_fkey";

-- DropForeignKey
ALTER TABLE "Movie" DROP CONSTRAINT "Movie_genreId_fkey";

-- DropTable
DROP TABLE "CharactersOnMovies";

-- DropTable
DROP TABLE "Genre";

-- DropTable
DROP TABLE "Movie";

-- CreateTable
CREATE TABLE "movies" (
    "id" SERIAL NOT NULL,
    "image" TEXT,
    "title" TEXT,
    "date_created" TIMESTAMP(3) NOT NULL,
    "score" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "movies_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "genres" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "genres_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "charactersonmovies" (
    "characterId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "charactersonmovies_pkey" PRIMARY KEY ("characterId","movieId")
);

-- AddForeignKey
ALTER TABLE "movies" ADD CONSTRAINT "movies_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "genres"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charactersonmovies" ADD CONSTRAINT "charactersonmovies_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "charactersonmovies" ADD CONSTRAINT "charactersonmovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
