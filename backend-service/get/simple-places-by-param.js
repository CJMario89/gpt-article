import { articleInstance } from "backend-service/common";

export const getSimplePlacesByParams = async (params = {}) => {
  const { type, country, city, region, status } = params;
  const isSpot = type === "spot";
  const places = await articleInstance({ type }).findMany({
    where: {
      country,
      ...(region ? { region } : {}),
      ...(isSpot ? { city } : {}),
      ...(status ? { status } : {}),
    },
    select: {
      ...(!isSpot ? { city: true } : {}),
      ...(isSpot ? { spot: true } : {}),
    },
  });

  return places;
};
