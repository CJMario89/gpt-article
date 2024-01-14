import { infoInstance } from "backend-service/common";

export const getSimplePlacesByParams = async (params = {}) => {
  const { type, country, city, region } = params;
  const isSpot = type === "spot";
  const places = await infoInstance({ type })
    .where({
      country,
      ...(region ? { region } : {}),
      ...(isSpot ? { city } : {}),
    })
    .select([...(!isSpot ? ["city"] : []), ...(isSpot ? ["spot"] : [])]);

  return places;
};
