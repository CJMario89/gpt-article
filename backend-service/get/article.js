import { instance } from "backend-service/common";

export const getArticle = async (params = {}) => {
  const { type, region, prefecture, city, spot } = params;
  if (type === "spot") {
    return instance.transaction(async (trx) => {
      const [info, categories, images, region] = await Promise.all([
        await trx("SpotInfo").where({ city, spot }).first(),
        await trx("SpotCategory")
          .where({ city, spot })
          .whereNotIn("category", ["point_of_interest", "establishment"])
          .select("category"),
        await trx("SpotImage")
          .where({ city, spot })
          .whereNotNull("fetched")
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
  } else if (type === "city") {
    return instance.transaction(async (trx) => {
      const [info, images] = await Promise.all([
        await trx("CityInfo").where({ prefecture, city }).first(),
        await trx("CityImage")
          .where({ prefecture, city })
          .whereNotNull("fetched")
          .select("referenceLink", "referenceName", "fetched"),
      ]);
      return {
        ...info,
        images,
      };
    });
  } else if (type === "prefecture") {
    return instance.transaction(async (trx) => {
      const [info, images] = await Promise.all([
        await trx("PrefectureInfo").where({ prefecture, region }).first(),
        await trx("PrefectureImage")
          .where({ region, prefecture })
          .whereNotNull("fetched")
          .select("referenceLink", "referenceName", "fetched"),
      ]);
      return {
        ...info,
        images,
      };
    });
  }
};
