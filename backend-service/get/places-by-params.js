import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPlacesByParams = async (params = {}) => {
  const { type, country, city, status } = params;
  let places = [];
  if (type === "spot") {
    places = await prisma.spotArticle.findMany({
      where: { country, city, ...(status ? { status } : {}) },
      select: {
        country: true,
        city: true,
        spot: true,
        title: true,
        description: true,
        status: true,
      },
    });
  } else {
    places = await prisma.cityArticle.findMany({
      where: { country, ...(status ? { status } : {}) },
      select: {
        country: true,
        city: true,
        title: true,
        description: true,
        status: true,
      },
    });
  }

  const sortPlaces = places.sort((a, b) => {
    if (Number(a.status) > Number(b.status)) return 1;
    else if (Number(a.status) < Number(b.status)) return -1;
    else return 0;
  });
  return sortPlaces;
};
