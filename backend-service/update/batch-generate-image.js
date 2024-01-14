import { instance } from "backend-service/common";
import { getGooglePhoto } from "backend-service/generate";

const requestNumber = 10000;
export const batchGenerateImage = async () => {
  // await batchCityImage();
  // await batchSpotImage();
  await batchRestuarantImage();
};

export const batchCityImage = async () => {
  const existedCities =
    await instance.raw(`SELECT CityInfo.prefecture, CityInfo.city, image from CityInfo 
  INNER JOIN CityImage ON CityImage.id = (SELECT MIN(id) FROM CityImage WHERE CityImage.city = CityInfo.city AND CityImage.prefecture = CityInfo.prefecture) Where fetched is null`);

  const requestCities =
    existedCities.length > requestNumber
      ? existedCities.slice(0, requestNumber)
      : existedCities;
  console.log(requestCities.length);
  for (let i = 0; i < requestCities.length; i++) {
    console.log(`Request ${i}th: ${requestCities[i].city}`);
    try {
      console.log(requestCities[i]);
      const prefecture = requestCities[i]?.prefecture;
      const city = requestCities[i]?.city;
      await getGooglePhoto({
        name: requestCities[i]?.image,
        location1: prefecture,
        location2: city,
        num: 1,
        folder: "city",
      });
      await instance.raw(`UPDATE CityImage SET fetched = true
        WHERE ID = (SELECT MIN(id) FROM CityImage WHERE prefecture = '${prefecture}' AND city = '${city.replace(
        /'/g,
        "''"
      )}' ORDER BY ID LIMIT 1) `);
    } catch (e) {
      console.log(e);
    }
  }
  return existedCities;
};

export const batchSpotImage = async () => {
  const existedSpots =
    await instance.raw(`SELECT SpotInfo.city, SpotInfo.spot, image from SpotInfo 
  INNER JOIN SpotImage ON SpotImage.id = (SELECT MIN(id) FROM SpotImage WHERE SpotImage.city = SpotInfo.city AND SpotImage.spot = SpotInfo.spot) Where fetched is null AND SpotInfo.articleType = 'spot'`);

  const requestSpots =
    existedSpots.length > requestNumber
      ? existedSpots.slice(0, requestNumber)
      : existedSpots;
  console.log(requestSpots.length);
  for (let i = 0; i < requestSpots.length; i++) {
    console.log(`Request ${i}th: ${requestSpots[i].spot}`);
    try {
      console.log(requestSpots[i]);
      const city = requestSpots[i]?.city;
      const spot = requestSpots[i]?.spot;
      await getGooglePhoto({
        name: requestSpots[i]?.image,
        location1: city,
        location2: spot,
        num: 1,
        folder: "spot",
      });
      await instance.raw(`UPDATE SpotImage SET fetched = true
        WHERE ID = (SELECT MIN(id) FROM SpotImage WHERE spot = '${spot.replace(
          /'/g,
          "''"
        )}' AND city = '${city.replace(/'/g, "''")}' ORDER BY ID LIMIT 1) `);
    } catch (e) {
      console.log(e);
    }
  }
  return existedSpots;
};

export const batchRestuarantImage = async () => {
  console.log("Restuarant image batched");
  const existedSpots =
    await instance.raw(`SELECT SpotInfo.city, SpotInfo.spot, image from SpotInfo 
  INNER JOIN SpotImage ON SpotImage.id = (SELECT MIN(id) FROM SpotImage WHERE SpotImage.city = SpotInfo.city AND SpotImage.spot = SpotInfo.spot) Where fetched is null AND SpotInfo.articleType = 'restuarant'`);

  const requestSpots =
    existedSpots.length > requestNumber
      ? existedSpots.slice(0, requestNumber)
      : existedSpots;
  console.log(requestSpots.length);
  for (let i = 0; i < requestSpots.length; i++) {
    console.log(`Request ${i}th: ${requestSpots[i].spot}`);
    try {
      console.log(requestSpots[i]);
      const city = requestSpots[i]?.city;
      const spot = requestSpots[i]?.spot;
      await getGooglePhoto({
        name: requestSpots[i]?.image,
        location1: city,
        location2: spot,
        num: 1,
        folder: "spot",
      });
      await instance.raw(`UPDATE SpotImage SET fetched = true
        WHERE ID = (SELECT MIN(id) FROM SpotImage WHERE spot = '${spot.replace(
          /'/g,
          "''"
        )}' AND city = '${city.replace(/'/g, "''")}' ORDER BY ID LIMIT 1) `);
    } catch (e) {
      console.log(e);
    }
  }
  return existedSpots;
};
