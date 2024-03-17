import { infoInstance, instance } from "backend-service/common";
import { localeInfo } from "./article";

const SearchByLocale = async ({ type, region, text, limit, page, locale }) => {
  //search by placeInfo localeInfo
  const transInfo = await instance(localeInfo[locale])
    .whereLike("placeId", `%${type}%`)
    .andWhereLike(type, `%${text}%`)
    .limit(limit)
    .offset((page - 1) * limit);
  const total = await instance(localeInfo[locale])
    .whereLike("placeId", `%${type}%`)
    .andWhereLike(type, `%${text}%`)
    .count();
  //imageUrl
  //articleUrl
  const ids = transInfo.map((place) => {
    const arr = place.placeId.split("-");
    return arr[arr.length - 2];
  });
  let places = await infoInstance({ type }).whereIn("id", ids);
  places = places.map((place) => {
    const imageUrl = {
      region: `https://jp-travel.s3.amazonaws.com/1/preview/prefecture/${region}_All_1.webp`,
      prefecture: `https://jp-travel.s3.amazonaws.com/1/preview/prefecture/${place.region}_${place.prefecture}_1.webp`,
      city: `https://jp-travel.s3.amazonaws.com/1/preview/city/${place.prefecture}_${place.city}_1.webp`,
      spot: `https://jp-travel.s3.amazonaws.com/1/preview/spot/${place.city}_${place.spot}_1.webp`,
    };
    const articleUrl = {
      region: `/article/${region}/`,
      prefecture: `/article/${region}/${place.prefecture}/`,
      city: `/article/${region}/${place.prefecture}/${place.city}/`,
      spot: `/article/${region}/${place.prefecture}/${place.city}/${place.spot}/`,
    };

    return {
      ...place,
      imageUrl: imageUrl[type],
      articleUrl: articleUrl[type],
      ...transInfo.find(
        (info) =>
          info.placeId ===
          `${place[type]}-${place.id}${
            type === "prefecture" || type === "region" ? "" : `-${type}`
          }`
      ),
    };
  });
  const totalPage = Math.ceil(total / limit);
  places = places.map((place) => ({ ...place, place: place[type] }));
  return {
    places,
    totalPage,
  };
};

export default SearchByLocale;
