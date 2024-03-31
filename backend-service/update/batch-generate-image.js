import { instance } from "backend-service/common";
import { getGooglePhoto } from "backend-service/generate";

// const requestNumber = 10000;
const requestNumber = 10000;
const version = "4";
export const batchGenerateImage = async () => {
  // await batchCityImage();
  // await batchSpotImage();
  // await batchRestuarantImage();
  // await batchPrefectureImage();
};

export const batchCityImage = async () => {
  const existedCities =
    await instance.raw(`SELECT CityInfo.prefecture, CityInfo.city, image, fetched from CityInfo
    INNER JOIN CityImage ON CityImage.id = 
      (SELECT DISTINCT id FROM 
        (SELECT id, row_number() OVER () AS rownum 
        FROM CityImage WHERE CityImage.city = CityInfo.city AND CityImage.prefecture = CityInfo.prefecture) AS x WHERE x.rownum = ${version});`);

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
        num: version,
        folder: "city",
      });
      await instance.raw(`UPDATE CityImage SET fetched = '${version}'
        WHERE id = (SELECT DISTINCT id FROM (SELECT id, row_number() over () AS rownum FROM CityImage WHERE prefecture = '${prefecture}' AND city = '${city.replace(
        /'/g,
        "''"
      )}') AS x WHERE x.rownum = ${version})`);
    } catch (e) {
      console.log(e);
    }
  }
  return existedCities;
};

export const batchSpotImage = async () => {
  const existedSpots =
    await instance.raw(`SELECT SpotInfo.city, SpotInfo.spot, image FROM SpotInfo 
    INNER JOIN SpotImage ON SpotImage.id = 
    (SELECT DISTINCT id FROM 
      (SELECT id, row_number() OVER () AS rownum 
      FROM SpotImage WHERE SpotImage.city = SpotInfo.city AND SpotImage.spot = SpotInfo.spot AND SpotInfo.articleType = 'spot') AS x WHERE x.rownum = ${version});`);

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
        num: version,
        folder: "spot",
      });
      await instance.raw(`UPDATE SpotImage SET fetched = '${version}'
        WHERE id = (SELECT DISTINCT id FROM (SELECT id, row_number() OVER () AS rownum FROM SpotImage WHERE spot = '${spot.replace(
          /'/g,
          "''"
        )}' AND city = '${city.replace(
        /'/g,
        "''"
      )}') AS x WHERE x.rownum = ${version}) `);
    } catch (e) {
      console.log(e);
    }
  }
  return existedSpots;
};

export const batchRestuarantImage = async () => {
  console.log("Restuarant image batched");
  const existedSpots =
    await instance.raw(`SELECT SpotInfo.city, SpotInfo.spot, image FROM SpotInfo 
    INNER JOIN SpotImage ON SpotImage.id = 
    (SELECT DISTINCT id FROM 
      (SELECT id, row_number() OVER () AS rownum 
      FROM SpotImage WHERE SpotImage.city = SpotInfo.city AND SpotImage.spot = SpotInfo.spot AND SpotInfo.articleType = 'restuarant') AS x WHERE x.rownum = ${version});`);

  const requestSpots =
    existedSpots.length > requestNumber
      ? existedSpots.slice(0, requestNumber)
      : existedSpots;
  console.log(requestSpots.length);
  for (let i = 0; i < requestSpots.length; i++) {
    console.log(`Request ${i}th: ${requestSpots[i].spot}`);
    try {
      // console.log(requestSpots[i]);
      const city = requestSpots[i]?.city;
      const spot = requestSpots[i]?.spot;
      await getGooglePhoto({
        name: requestSpots[i]?.image,
        location1: city,
        location2: spot,
        num: version,
        folder: "spot",
      });
      await instance.raw(`UPDATE SpotImage SET fetched = '${version}'
        WHERE id = (SELECT DISTINCT id FROM (SELECT id, row_number() OVER () AS rownum FROM SpotImage WHERE spot = '${spot.replace(
          /'/g,
          "''"
        )}' AND city = '${city.replace(
        /'/g,
        "''"
      )}') AS x WHERE x.rownum = ${version}) `);
    } catch (e) {
      console.log(e);
    }
  }
  return existedSpots;
};

export const batchPrefectureImage = async () => {
  console.log("Prefecture image batched");
  const existedPrefectures =
    await instance.raw(`SELECT PrefectureInfo.prefecture, PrefectureInfo.region, image FROM PrefectureInfo 
  INNER JOIN PrefectureImage ON PrefectureImage.id = 
  (SELECT DISTINCT id FROM 
    (SELECT id, row_number() OVER () AS rownum 
    FROM PrefectureImage WHERE PrefectureImage.region = PrefectureInfo.region AND PrefectureImage.prefecture = PrefectureInfo.prefecture) AS x WHERE x.rownum = ${version});`);

  const requestPrefectures =
    existedPrefectures.length > requestNumber
      ? existedPrefectures.slice(0, requestNumber)
      : existedPrefectures;
  console.log(requestPrefectures.length);
  for (let i = 0; i < requestPrefectures.length; i++) {
    console.log(
      `Request ${i}th: ${requestPrefectures[i].region} ${requestPrefectures[i].prefecture}`
    );
    try {
      const region = requestPrefectures[i]?.region;
      const prefecture = requestPrefectures[i]?.prefecture;
      await getGooglePhoto({
        name: requestPrefectures[i]?.image,
        location1: region,
        location2: prefecture,
        num: version,
        folder: "prefecture",
      });
      await instance.raw(`UPDATE PrefectureImage SET fetched = '${version}'
        WHERE id = (SELECT DISTINCT id FROM (SELECT id, row_number() OVER () AS rownum FROM PrefectureImage WHERE region = '${region}' AND Prefecture = '${prefecture}') AS x WHERE x.rownum = ${version}) `);
    } catch (e) {
      console.log(e);
    }
  }
  return existedPrefectures;
};
