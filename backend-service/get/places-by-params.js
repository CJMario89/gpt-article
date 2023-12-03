import { articleInstance } from "backend-service/common";

export const getPlacesByParams = async (params = {}) => {
  const { type, country, city, region, page, limit = 4 } = params;
  const isSpot = type === "spot";
  const places = await articleInstance({ type })
    .where({
      country,
      ...(region ? { region } : {}),
      ...(isSpot ? { city } : {}),
    })
    .limit(Number(limit))
    .offset((page - 1) * limit)
    .select([
      "country",
      "city",
      ...(isSpot ? ["spot"] : []),
      "title",
      "description",
      "preview_image",
      "image_reference_link",
      "image_reference_name",
    ]);
  const total = (
    await articleInstance({ type })
      .where({
        country,
        ...(region ? { region } : {}),
        ...(isSpot ? { city } : {}),
      })
      .count(`${type} AS count`)
  )[0].count;

  const totalPage = Math.ceil(total / limit);

  return {
    places,
    totalPage,
  };
};
