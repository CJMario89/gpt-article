import { instance } from "backend-service/common";

export const getAllPlaces = async (params = {}) => {
  const { type } = params;
  const places =
    type === "spot"
      ? await instance.raw(`SELECT CityInfo.region, SpotInfo.prefecture, SpotInfo.city, SpotInfo.spot from SpotInfo
  INNER JOIN CityInfo on CityInfo.city = SpotInfo.city AND CityInfo.prefecture = SpotInfo.prefecture
  ;`)
      : await instance.raw(`SELECT region, prefecture, city from CityInfo;`);

  return places;
};
