import { articleInstance } from "backend-service/common";

export const getArticle = async (params = {}) => {
  const { type, country, city, spot } = params;
  const isSpot = type === "spot";
  return await articleInstance({ type })
    .where({
      country,
      city,
      ...(isSpot ? { spot } : {}),
    })
    .select([
      "country",
      "city",
      ...(isSpot ? ["spot"] : []),
      "title",
      "description",
      "content",
      "image",
      "image_reference_link",
      "image_reference_name",
    ])
    .first();
};
