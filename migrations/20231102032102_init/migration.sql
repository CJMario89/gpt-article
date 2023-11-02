-- CreateTable
CREATE TABLE "cityArticle" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cityArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "cityImage" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "cityImage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spotArticle" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "spot" TEXT NOT NULL,
    "status" INTEGER NOT NULL DEFAULT 0,
    "title" TEXT NOT NULL DEFAULT '',
    "description" TEXT NOT NULL DEFAULT '',
    "content" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "spotArticle_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "spotImage" (
    "id" SERIAL NOT NULL,
    "country" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "spot" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "spotImage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "cityArticle_city_key" ON "cityArticle"("city");

-- CreateIndex
CREATE UNIQUE INDEX "cityImage_city_key" ON "cityImage"("city");

-- CreateIndex
CREATE UNIQUE INDEX "spotArticle_spot_key" ON "spotArticle"("spot");

-- CreateIndex
CREATE UNIQUE INDEX "spotImage_spot_key" ON "spotImage"("spot");
