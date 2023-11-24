import { articleInstance } from "backend-service/common";

export const getPlacesByParams = async (params = {}) => {
  const { type, country, city, region, page, limit } = params;
  console.log(params);
  const isSpot = type === "spot";
  const places = await articleInstance({ type }).findMany({
    where: {
      country,
      ...(region ? { region } : {}),
      ...(isSpot ? { city } : {}),
    },
    skip: (page - 1) * limit,
    take: Number(limit),
    select: {
      country: true,
      city: true,
      ...(isSpot ? { spot: true } : {}),
      title: true,
      description: true,
      content: true,
      // image: true,
      preview_image: true,
      image_reference_link: true,
      image_reference_name: true,
    },
  });

  const total = await articleInstance({ type }).count({
    where: {
      country,
      ...(region ? { region } : {}),
      ...(isSpot ? { city } : {}),
    },
  });
  const totalPage = Math.ceil(total / limit);

  return {
    places,
    totalPage,
  };
};
