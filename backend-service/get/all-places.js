import { articleInstance } from "backend-service/common";

export const getAllPlaces = async (params = {}) => {
  const { type } = params;
  const places = await articleInstance({ type }).select([
    "country",
    "city",
    ...(type === "spot" ? ["spot"] : []),
  ]);

  return places;
};
