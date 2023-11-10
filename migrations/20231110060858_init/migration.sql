-- CreateTable
CREATE TABLE "cityArticle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "cityImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "image" BLOB NOT NULL,
    "referenceLink" TEXT NOT NULL DEFAULT '',
    "referenceName" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "spotArticle" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "spot" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "spotImage" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "spot" TEXT NOT NULL,
    "image" BLOB NOT NULL,
    "referenceLink" TEXT NOT NULL DEFAULT '',
    "referenceName" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateIndex
CREATE UNIQUE INDEX "cityArticle_city_key" ON "cityArticle"("city");

-- CreateIndex
CREATE UNIQUE INDEX "cityImage_city_key" ON "cityImage"("city");

-- CreateIndex
CREATE UNIQUE INDEX "spotArticle_spot_key" ON "spotArticle"("spot");

-- CreateIndex
CREATE UNIQUE INDEX "spotImage_spot_key" ON "spotImage"("spot");
