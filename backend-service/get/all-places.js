import { instance } from "backend-service/common";
import { localeInfo } from "./article";

const query = {
  spot: `SELECT CityInfo.region, SpotInfo.prefecture, SpotInfo.city, SpotInfo.spot from SpotInfo
  INNER JOIN CityInfo on CityInfo.city = SpotInfo.city AND CityInfo.prefecture = SpotInfo.prefecture
  ;`,
  city: `SELECT region, prefecture, city from CityInfo;`,
  prefecture: `SELECT id, region, prefecture from PrefectureInfo WHERE prefecture != 'All'`,
  region: `SELECT id, region from PrefectureInfo WHERE prefecture = 'All'`,
};

export const getAllPlaces = async (params = {}, locale) => {
  const { type } = params;
  const places = await instance.raw(query[type]);
  if (locale !== "en-US") {
    const placesId = places.map((place) => `${place[type]}-${place.id}`);
    const transInfo = await instance(localeInfo).whereIn("placeId", placesId);
    places.transInfo = transInfo;
  }
  return places;
};
