import { prisma } from "backend-service/prisma";

export const getCountries = async () => {
  const countries = await prisma.cityArticle.groupBy({
    by: ["country"],
    select: {
      country: true,
    },
  });
  return countries;
};
