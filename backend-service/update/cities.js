import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateCities = async ({ country, cities }) => {
  const data = [];
  cities.forEach((city) => {
    data.push({
      country,
      city,
    });
  });
  console.log(data);

  await prisma.cityArticle.createMany({ data });
};
