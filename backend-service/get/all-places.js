import { articleInstance } from "backend-service/common";

export const getAllPlaces = async (params = {}) => {
  const { type } = params;
  const places = await articleInstance({ type }).findMany({
    select: {
      country: true,
      city: true,
      ...(type === "spot" ? { spot: true } : {}),
    },
  });

  return places;
};
