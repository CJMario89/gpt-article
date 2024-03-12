import { infoInstance, instance } from "backend-service/common";
import { localeInfo } from "./article";

export const getNearPlaces = async ({
  type,
  prefecture,
  city,
  spot,
  limit,
  page,
  locale,
}) => {
  const isSpot = type === "spot";
  // const isCity = type === "city";
  const isRestuarant = type === "restuarant";
  const whereArgs = {
    spot: { city, spot },
    restuarant: { city, spot },
    city: { prefecture, city },
    prefecture: { prefecture },
  };
  const info = await infoInstance({ type }).where(whereArgs[type]).first();
  if (!info?.location) {
    return [];
  }
  const location = info?.location.split(",");
  const latitude = location[0];
  const longitude = location[1];
  //exclude the current city or spot.
  const query = {
    restuarant: `SELECT * FROM (SELECT SpotInfo.id AS infoId, SpotInfo.city, SpotInfo.spot, title, description, 
      POWER(${latitude} - substr(location, 0, instr(location, ',')), 2) + POWER(${longitude} - substr(location, instr(location, ',') + 1), 2) AS distance 
      FROM SpotInfo WHERE SpotInfo.articleType = 'restuarant' ORDER BY distance LIMIT ${limit} OFFSET ${
      isRestuarant ? (page - 1) * limit + 1 : (page - 1) * limit
    }) AS SpotInfo
      JOIN SpotImage ON SpotImage.id = (SELECT MIN(id) FROM SpotImage WHERE SpotImage.city = SpotInfo.city AND SpotImage.spot = SpotInfo.spot)`,
    spot: `SELECT * FROM (SELECT SpotInfo.id AS infoId, SpotInfo.city, SpotInfo.spot, title, description, 
    POWER(${latitude} - substr(location, 0, instr(location, ',')), 2) + POWER(${longitude} - substr(location, instr(location, ',') + 1), 2) AS distance 
    FROM SpotInfo WHERE SpotInfo.articleType = 'spot' ORDER BY distance LIMIT ${limit} OFFSET ${
      isSpot ? (page - 1) * limit + 1 : (page - 1) * limit
    }) AS SpotInfo
    JOIN SpotImage ON SpotImage.id = (SELECT MIN(id) FROM SpotImage WHERE SpotImage.city = SpotInfo.city AND SpotImage.spot = SpotInfo.spot)`,
    city: `SELECT * FROM (SELECT  CityInfo.id AS infoId, CityInfo.prefecture, CityInfo.city, title, description,  
    POWER(${latitude} - substr(location, 0, instr(location, ',')), 2) + POWER(${longitude} - substr(location, instr(location, ',') + 1), 2) AS distance 
    FROM CityInfo ORDER BY distance LIMIT ${limit} OFFSET ${
      (page - 1) * limit + 1
    }) AS CityInfo
    JOIN CityImage ON CityImage.id = (SELECT MIN(id) FROM CityImage WHERE CityImage.city = CityInfo.city AND CityImage.prefecture = CityInfo.prefecture)`,
    prefecture: `SELECT * FROM (SELECT id AS infoId, prefecture, title, description,  
      POWER(${latitude} - substr(location, 0, instr(location, ',')), 2) + POWER(${longitude} - substr(location, instr(location, ',') + 1), 2) AS distance 
      FROM PrefectureInfo WHERE prefecture != 'All' ORDER BY distance LIMIT ${limit} OFFSET ${
      (page - 1) * limit + 1
    }) AS PrefectureInfo
      JOIN PrefectureImage ON PrefectureImage.id = (SELECT MIN(id) FROM PrefectureImage WHERE PrefectureImage.prefecture = PrefectureInfo.prefecture)`,
  };
  let places = await instance.raw(query[type]);
  const _type = type === "restuarant" ? "spot" : type;
  places = places.map((place) => {
    const imageUrl = {
      region: `https://jp-travel.s3.amazonaws.com/1/preview/prefecture/${place.region}_All_1.webp`,
      prefecture: `https://jp-travel.s3.amazonaws.com/1/preview/prefecture/${place.region}_${place.prefecture}_1.webp`,
      city: `https://jp-travel.s3.amazonaws.com/1/preview/city/${place.prefecture}_${place.city}_1.webp`,
      spot: `https://jp-travel.s3.amazonaws.com/1/preview/spot/${place.city}_${place.spot}_1.webp`,
    };
    return { ...place, imageUrl: imageUrl[_type] };
  });

  places = places.map((place) => {
    const articleUrl = {
      region: `/article/${place.region}/`,
      prefecture: `/article/${place.region}/${place.prefecture}/`,
      city: `/article/${place.region}/${place.prefecture}/${place.city}/`,
      spot: `/article/${place.region}/${place.prefecture}/${place.city}/${place.spot}/`,
    };
    return { ...place, articleUrl: articleUrl[_type] };
  });
  if (locale !== "en-US") {
    const placesId = places.map((place) => {
      return `${place[_type]}-${place.infoId}${
        _type === "prefecture" || _type === "region" ? "" : `-${_type}`
      }`;
    });
    const transInfo = await instance(localeInfo[locale]).whereIn(
      "placeId",
      placesId
    );
    places = places.map((place) => {
      return {
        ...place,
        ...transInfo.find(
          (info) =>
            info.placeId ===
            `${place[_type]}-${place.infoId}${
              _type === "prefecture" || _type === "region" ? "" : `-${_type}`
            }`
        ),
      };
    });
  }
  return places;
};
