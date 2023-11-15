import { prisma } from "backend-service/prisma";

export const getAllPlaces = async (params = {}) => {
  const { type, status } = params;
  let places = [];
  if (type === "spot") {
    places = await prisma.spotArticle.findMany({
      where: { ...(status ? { status } : {}) },
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
      where: { ...(status ? { status } : {}) },
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
