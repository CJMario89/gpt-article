import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCountries = async () => {
  const countries = await prisma.cityArticle.groupBy({
    by: ["country"],
    select: {
      country: true,
    },
  });
  return countries;
};
