-- CreateTable
CREATE TABLE "Afisha" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" TEXT NOT NULL,
    "image_path" TEXT NOT NULL,
    "rate" REAL NOT NULL
);

-- CreateTable
CREATE TABLE "Genre" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "GenresOnAfisha" (
    "afishaId" INTEGER NOT NULL,
    "genreId" INTEGER NOT NULL,

    PRIMARY KEY ("afishaId", "genreId"),
    CONSTRAINT "GenresOnAfisha_afishaId_fkey" FOREIGN KEY ("afishaId") REFERENCES "Afisha" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "GenresOnAfisha_genreId_fkey" FOREIGN KEY ("genreId") REFERENCES "Genre" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Actor" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "image_path" TEXT NOT NULL,
    "character" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ActorsOnAfisha" (
    "afishaId" INTEGER NOT NULL,
    "actorId" INTEGER NOT NULL,

    PRIMARY KEY ("afishaId", "actorId"),
    CONSTRAINT "ActorsOnAfisha_afishaId_fkey" FOREIGN KEY ("afishaId") REFERENCES "Afisha" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "ActorsOnAfisha_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Actor" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
