import { infoInstance, instance } from "backend-service/common";
// const target = "PlaceInfoZhTW";
const target = "PlaceInfoJaJP";

export const batchInsertLocalePlace = async () => {
  // insertPrefectures();
  // insertCities();
  insertSpots();
};

const insertPrefectures = async () => {
  const _prefectures = await instance(target)
    .whereNotNull("prefecture")
    .select("placeId");
  const ids = _prefectures.map((prefecture) => {
    return prefecture.placeId.split("-")[1];
  });
  const prefectures = await infoInstance({ type: "prefecture" }).where(
    "id",
    "in",
    ids
  );
  prefectures.forEach(async (prefecture) => {
    const _region = await infoInstance({ type: "prefecture" })
      .where({ region: prefecture.region, prefecture: "All" })
      .first();
    console.log(_region.id, _region.region);
    const region = await instance(target)
      .where("placeId", `${_region.region}-${_region.id}`)
      .first();
    console.log(prefecture.prefecture, prefecture.id, region.region);
    await instance(target)
      .where("placeId", `${prefecture.prefecture}-${prefecture.id}`)
      .update({ region: region.region });
  });
};

const insertCities = async () => {
  const _prefectures = await instance(target)
    .whereNotNull("city")
    .select("placeId");
  const ids = _prefectures.map((prefecture) => {
    return prefecture.placeId.split("-")[1];
  });
  const cities = await infoInstance({ type: "city" }).where("id", "in", ids);
  cities.forEach(async (city) => {
    const _prefecture = await infoInstance({ type: "prefecture" })
      .where({ prefecture: city.prefecture })
      .first();
    console.log(_prefecture.id, _prefecture.prefecture);
    const prefecture = await instance(target)
      .where("placeId", `${_prefecture.prefecture}-${_prefecture.id}`)
      .first();
    console.log(city.city, prefecture.id, prefecture.prefecture);
    await instance(target)
      .where("placeId", `${city.city}-${city.id}-city`)
      .update({ region: prefecture.region, prefecture: prefecture.prefecture });
  });
};

const insertSpots = async () => {
  const _cities = await instance(target).whereNotNull("spot").select("placeId");
  const ids = _cities.map((prefecture) => {
    const arr = prefecture.placeId.split("-");
    return arr[arr.length - 2];
  });
  const spots = await infoInstance({ type: "spot" }).where("id", "in", ids);
  spots.forEach(async (spot) => {
    const _city = await infoInstance({ type: "city" })
      .where({ city: spot.city })
      .first();
    console.log(_city.id, _city.city);
    const city = await instance(target)
      .where("placeId", `${_city.city}-${_city.id}-city`)
      .first();
    console.log(spot.spot, city.id, city.city, city.prefecture, city.region);
    await instance(target)
      .where("placeId", `${spot.spot}-${spot.id}-spot`)
      .update({
        region: city.region,
        prefecture: city.prefecture,
        city: city.city,
      });
  });
};
