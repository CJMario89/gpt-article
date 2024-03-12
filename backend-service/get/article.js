import { instance } from "backend-service/common";
export const localeInfo = {
  "zh-TW": "PlaceInfoZhTW",
};
export const getArticle = async (params = {}) => {
  const { type, region, prefecture, city, spot, locale } = params;
  let article;
  if (type === "spot") {
    article = await instance.transaction(async (trx) => {
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
    article = await instance.transaction(async (trx) => {
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
  } else if (type === "prefecture" || type === "region") {
    article = await instance.transaction(async (trx) => {
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

  article = {
    ...article,
    images: article.images.map((image) => {
      const imageUrl = {
        region: `https://jp-travel.s3.amazonaws.com/${image.fetched}/blog/prefecture/${article.region}_${article.prefecture}_${image.fetched}.webp`,
        prefecture: `https://jp-travel.s3.amazonaws.com/${image.fetched}/blog/prefecture/${article.region}_${article.prefecture}_${image.fetched}.webp`,
        city: `https://jp-travel.s3.amazonaws.com/${image.fetched}/blog/city/${article.prefecture}_${article.city}_${image.fetched}.webp`,
        spot: `https://jp-travel.s3.amazonaws.com/${image.fetched}/blog/spot/${article.city}_${article.spot}_${image.fetched}.webp`,
      };
      return { ...image, imageUrl: imageUrl[type] };
    }),
  };
  if (locale === "en-US") {
    return article;
  } else {
    const transInfo = await instance(localeInfo[locale])
      .where(
        "placeId",
        `${article[type]}-${article.id}${
          type === "prefecture" || type === "region" ? "" : `-${type}`
        }`
      )
      .first();
    return { ...article, ...transInfo };
  }
};
