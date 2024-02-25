import { infoInstance, instance } from "backend-service/common";

export const getNearPlaces = async ({
  type,
  prefecture,
  city,
  spot,
  limit,
  page,
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
    restuarant: `SELECT * FROM (SELECT SpotInfo.city, SpotInfo.spot, title, description, 
      POWER(${latitude} - substr(location, 0, instr(location, ',')), 2) + POWER(${longitude} - substr(location, instr(location, ',') + 1), 2) AS distance 
      FROM SpotInfo WHERE SpotInfo.articleType = 'restuarant' ORDER BY distance LIMIT ${limit} OFFSET ${
      isRestuarant ? (page - 1) * limit + 1 : (page - 1) * limit
    }) AS SpotInfo
      JOIN SpotImage ON SpotImage.id = (SELECT MIN(id) FROM SpotImage WHERE SpotImage.city = SpotInfo.city AND SpotImage.spot = SpotInfo.spot)`,
    spot: `SELECT * FROM (SELECT SpotInfo.city, SpotInfo.spot, title, description, 
    POWER(${latitude} - substr(location, 0, instr(location, ',')), 2) + POWER(${longitude} - substr(location, instr(location, ',') + 1), 2) AS distance 
    FROM SpotInfo WHERE SpotInfo.articleType = 'spot' ORDER BY distance LIMIT ${limit} OFFSET ${
      isSpot ? (page - 1) * limit + 1 : (page - 1) * limit
    }) AS SpotInfo
    JOIN SpotImage ON SpotImage.id = (SELECT MIN(id) FROM SpotImage WHERE SpotImage.city = SpotInfo.city AND SpotImage.spot = SpotInfo.spot)`,
    city: `SELECT * FROM (SELECT CityInfo.prefecture, CityInfo.city, title, description,  
    POWER(${latitude} - substr(location, 0, instr(location, ',')), 2) + POWER(${longitude} - substr(location, instr(location, ',') + 1), 2) AS distance 
    FROM CityInfo ORDER BY distance LIMIT ${limit} OFFSET ${
      (page - 1) * limit + 1
    }) AS CityInfo
    JOIN CityImage ON CityImage.id = (SELECT MIN(id) FROM CityImage WHERE CityImage.city = CityInfo.city AND CityImage.prefecture = CityInfo.prefecture)`,
    prefecture: `SELECT * FROM (SELECT prefecture, title, description,  
      POWER(${latitude} - substr(location, 0, instr(location, ',')), 2) + POWER(${longitude} - substr(location, instr(location, ',') + 1), 2) AS distance 
      FROM PrefectureInfo WHERE prefecture != 'All' ORDER BY distance LIMIT ${limit} OFFSET ${
      (page - 1) * limit + 1
    }) AS PrefectureInfo
      JOIN PrefectureImage ON PrefectureImage.id = (SELECT MIN(id) FROM PrefectureImage WHERE PrefectureImage.prefecture = PrefectureInfo.prefecture)`,
  };
  const places = await instance.raw(query[type]);
  return places;
};
