import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient();

export const updateCityPhoto = async ({
  country,
  city,
  url,
  referenceLink,
  referenceName,
}) => {
  await prisma.cityImage.update({
    where: {
      country,
      city,
    },
    data: {
      country,
      city,
      url,
      referenceLink,
      referenceName,
    },
  });
};
