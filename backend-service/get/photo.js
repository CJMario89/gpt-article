import { prisma } from "backend-service/prisma";

export const getPhoto = async ({ type, country, city, spot }) => {
  if (type === "spot") {
    return await prisma.spotImage.findUnique({
      where: { country, city, spot },
      select: {
        country: true,
        city: true,
        spot: true,
        image: true,
        referenceLink: true,
        referenceName: true,
      },
    });
  } else {
    return await prisma.cityImage.findUnique({
      where: { country, city },
      select: {
        country: true,
        city: true,
        image: true,
        referenceLink: true,
        referenceName: true,
      },
    });
  }
};
