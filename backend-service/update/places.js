import { articleInstance } from "backend-service/common";

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
  } else {
    cities.forEach((city) => {
      data.push({
        country,
        city,
      });
    });
  }

  await articleInstance({ type }).insert(data);
};
