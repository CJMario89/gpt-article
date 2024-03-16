import { infoInstance, instance } from "backend-service/common";
import { translateText } from "./translate";

export const updateJapanLocaleInfo = async () => {
  // updateSpot();
  // updateRegion();
  // updatePrefecture();
  updateCity();
};

const updateSpot = async () => {
  const placeIds = await instance("PlaceInfoJaJP")
    .whereNotNull("spot")
    .select("placeId");
  const spots = placeIds.map(({ placeId }) => {
    const arr = placeId.split("-");
    const id = arr[arr.length - 2];
    const spot = placeId.split(`-${id}-`)[0];
    return {
      placeId,
      id,
      spot,
    };
  });
  console.log(spots);
  spots.forEach(async (spot) => {
    await instance("PlaceInfoJaJP")
      .where("placeId", spot.placeId)
      .update({ spot: spot.spot });
  });
};

const updateRegion = async () => {
  const places = await instance("PlaceInfoZhTW").whereNull("prefecture");
  console.log(places);
  places.forEach(async (place) => {
    const region = place.region;
    const translation = await translateText(region, "ja-JP");
    console.log(translation, place.placeId);
    await instance("PlaceInfoJaJP")
      .where("placeId", place.placeId)
      .update("region", translation);
  });
};

const updatePrefecture = async () => {
  const places = await instance("PlaceInfoZhTW")
    .whereNull("city")
    .whereNotNull("prefecture");
  places.forEach(async (place) => {
    const region = place.prefecture;
    const translation = await translateText(region, "ja-JP");
    console.log(translation, place.placeId);
    await instance("PlaceInfoJaJP")
      .where("placeId", place.placeId)
      .update("prefecture", translation);
  });
};

const updateCity = async () => {
  const places = await instance("PlaceInfoZhTW")
    .whereNull("spot")
    .whereNotNull("city");
  const placeIds = places.map((place) => {
    const placeId = place.placeId;
    const arr = placeId.split("-");
    const id = arr[arr.length - 2];
    return { placeId: place.placeId, id };
    // const translation = await translateText(city, "ja-JP");
    //cityJapanese
    // await instance("PlaceInfoJaJP")
    //   .where("placeId", place.placeId)
    //   .update("city", translation);
  });
  placeIds.map(async ({ placeId, id }) => {
    const city = await infoInstance({ type: "city" }).where("id", id).first();
    const cityJapanese = city.cityJapanese;
    console.log(cityJapanese, placeId);
    await instance("PlaceInfoJaJP")
      .where("placeId", placeId)
      .update("city", cityJapanese);
    await instance("placeInfoZhTW")
      .where("placeId", placeId)
      .update("city", cityJapanese);
  });
};
