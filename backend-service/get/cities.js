import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCities = async (params = {}) => {
  const { country } = params;
  const cities = await prisma.cityArticle.findMany({
    where: country
      ? {
          country,
        }
      : {},
    select: {
      country: true,
      city: true,
      title: true,
      description: true,
      status: true,
    },
  });
  const sortCities = cities.sort((a, b) => {
    if (Number(a.status) > Number(b.status)) return 1;
    else if (Number(a.status) < Number(b.status)) return -1;
    else return 0;
  });
  return sortCities;
};
