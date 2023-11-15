import { prisma } from "backend-service/prisma";

export const updatePhoto = async ({
  type,
  country,
  city,
  url,
  spot,
  referenceLink,
  referenceName,
}) => {
  if (type === "spot") {
    const data = {
      country,
      city,
      url,
      spot,
      referenceLink,
      referenceName,
    };
    await prisma.spotImage.upsert({
      where: {
        country,
        city,
        spot,
      },
      update: data,
      create: data,
    });
  } else {
    const data = {
      country,
      city,
      url,
      referenceLink,
      referenceName,
    };
    await prisma.cityImage.upsert({
      where: {
        country,
        city,
      },
      create: data,
      update: data,
    });
  }
};
