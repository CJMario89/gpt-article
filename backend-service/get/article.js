import { instance } from "backend-service/common";

export const getArticle = async (params = {}) => {
  const { type, prefecture, city, spot } = params;
  const isSpot = type === "spot";
  if (isSpot) {
    return instance.transaction(async (trx) => {
      const [info, categories, images, region] = await Promise.all([
        await trx("SpotInfo").where({ city, spot }).first(),
        await trx("SpotCategory")
          .where({ city, spot })
          .whereNotIn("category", ["point_of_interest", "establishment"])
          .select("category"),
        await trx("SpotImage")
          .where({ city, spot })
          .select("referenceLink", "referenceName", "fetched"),
        await trx("CityInfo").where({ city }).select("region").first(),
      ]);
      return {
        ...info,
        ...region,
        categories,
        images,
      };
    });
  } else {
    return instance.transaction(async (trx) => {
      const [info, images] = await Promise.all([
        await trx("CityInfo").where({ prefecture, city }).first(),
        await trx("CityImage")
          .where({ prefecture, city })
          .select("referenceLink", "referenceName"),
      ]);
      return {
        ...info,
        images,
      };
    });
  }
};
