import { prisma } from "backend-service/common";

export const getCountries = async () => {
  const countries = await prisma.cityArticle.groupBy({
    by: ["country"],
    select: {
      country: true,
    },
  });
  return countries;
};
