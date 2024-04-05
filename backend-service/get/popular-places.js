import { instance } from "backend-service/common";
import { localeInfo } from "./article";

export const getPopularPlaces = async ({ type, place, locale, limit = 20 }) => {
  const query = `
    SELECT 
      * 
    FROM "SpotInfo" 
    WHERE ${type} = '${place}' 
    ORDER BY POWER(googleRatingCount, googleRating) DESC 
    LIMIT ${limit};`;
  let spots = await instance.raw(query);

  spots = spots.map((place) => {
    const imageUrl = `https://jp-travel.s3.amazonaws.com/1/preview/spot/${place.city}_${place.spot}_1.webp`;
    return { ...place, imageUrl: imageUrl };
  });

  spots = spots.map((place) => {
    const articleUrl = `/article/${place.region}/${place.prefecture}/${place.city}/${place.spot}/`;
    return { ...place, articleUrl: articleUrl };
  });
  if (locale !== "en-US" && locale) {
    spots = await Promise.all(
      spots.map(async ({ spot, id, imageUrl, articleUrl }) => {
        const translation = await instance(localeInfo[locale])
          .where("placeId", `${spot}-${id}-spot`)
          .first();
        return { ...translation, imageUrl, articleUrl };
      })
    );
  }

  return spots;
};
