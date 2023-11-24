import { articleInstance } from "backend-service/common";

export const getAllPlaces = async (params = {}) => {
  const { type, status } = params;
  const places = await articleInstance({ type }).findMany({
    where: { ...(status ? { status } : {}) },
    select: {
      country: true,
      city: true,
      ...(type === "spot" ? { spot: true } : {}),
    },
  });

  return places;
};
