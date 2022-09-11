/*
  Warnings:

  - Added the required column `birth_date` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `history` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weight` to the `characters` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "characters" ADD COLUMN     "birth_date" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "history" TEXT NOT NULL,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "weight" DOUBLE PRECISION NOT NULL;

-- CreateTable
CREATE TABLE "Movie" (
    "id" SERIAL NOT NULL,
    "image" TEXT,
    "title" TEXT,
    "date_created" TIMESTAMP(3) NOT NULL,
    "score" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    CONSTRAINT "Movie_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "image" TEXT,

    CONSTRAINT "Genre_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CharactersOnMovies" (
    "characterId" INTEGER NOT NULL,
    "movieId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CharactersOnMovies_pkey" PRIMARY KEY ("characterId","movieId")
);

-- AddForeignKey
ALTER TABLE "Movie" ADD CONSTRAINT "Movie_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharactersOnMovies" ADD CONSTRAINT "CharactersOnMovies_characterId_fkey" FOREIGN KEY ("characterId") REFERENCES "characters"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CharactersOnMovies" ADD CONSTRAINT "CharactersOnMovies_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "Movie"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
