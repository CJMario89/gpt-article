import { prisma } from "backend-service/prisma";

export const updatePlaces = async ({ type, country, cities, spots }) => {
  const data = [];
  if (type === "spot") {
    spots.forEach((spot) => {
      data.push({
        country,
        city: cities[0],
        spot,
      });
    });
    console.log(data);
    await prisma.spotArticle.createMany({ data });
  } else {
    cities.forEach((city) => {
      data.push({
        country,
        city,
      });
    });
    console.log(data);

    await prisma.cityArticle.createMany({ data });
  }
};
