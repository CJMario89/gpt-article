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

  const sortPlaces = places.sort((a, b) => {
    if (Number(a.status) > Number(b.status)) return 1;
    else if (Number(a.status) < Number(b.status)) return -1;
    else return 0;
  });
  return sortPlaces;
};
