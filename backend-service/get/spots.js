import { infoInstance } from "backend-service/common";

export const getSpots = async ({ prefecture, city }) => {
  const spots = await infoInstance({ type: "spot" })
    .where({ prefecture, city })
    .select("spot");
  return spots.map(({ spot }) => spot);
};
