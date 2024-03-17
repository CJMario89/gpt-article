import { instance } from "backend-service/common";
import { localeInfo } from "./article";

export const search = async ({
  type,
  text,
  region,
  prefecture,
  city,
  limit,
  page,
  locale,
}) => {
  let query;
  if (text) {
    query = {
      spot: `
        SELECT 
          DISTINCT word as spot, 
          SpotInfo.id,
          CityInfo.region, 
          SpotInfo.prefecture, 
          SpotInfo.city, 
          SpotInfo.title, 
          SpotInfo.description, 
          SpotInfo.priceLevel AS priceLevel
        FROM SpotInfo_spellfix 
        LEFT OUTER JOIN SpotInfo ON 
          SpotInfo_spellfix.word = SpotInfo.spot 
        LEFT OUTER JOIN CityInfo ON 
          SpotInfo.city = CityInfo.city AND 
          SpotInfo.prefecture = CityInfo.prefecture
        WHERE 
          word MATCH '*${text}*' AND 
          TOP = 10000
          ${region ? ` AND CityInfo.region = '${region}'` : ""}
          ${prefecture ? ` AND SpotInfo.prefecture = '${prefecture}'` : ""}
          ${city ? ` AND SpotInfo.city = '${city?.replace("'", "''")}'` : ""}`,
      city: `
        SELECT 
          DISTINCT word as city, 
          CityInfo.id,
          CityInfo.region, 
          CityInfo.prefecture, 
          CityInfo.title, 
          CityInfo.description, 
          CityImage.referenceLink, 
          CityImage.referenceName 
        FROM CityInfo_spellfix 
        LEFT OUTER JOIN
          CityInfo ON CityInfo_spellfix.word = CityInfo.city 
          ${region ? ` AND CityInfo.region = '${region}'` : ""}
          ${prefecture ? ` AND CityInfo.prefecture = '${prefecture}'` : ""}
        LEFT OUTER JOIN CityImage ON 
          CityImage.id = (
            SELECT 
              MIN(id) 
            FROM CityImage 
            WHERE 
              CityImage.city = CityInfo.city AND 
              CityImage.prefecture = CityInfo.prefecture
          )
        WHERE 
          word MATCH '*${text}*' AND 
          TOP = 10000
          ${region ? ` AND CityInfo.region = '${region}'` : ""}`,
      prefecture: `
        SELECT 
          DISTINCT word as prefecture, 
          PrefectureInfo.id,
          PrefectureInfo.region, 
          PrefectureInfo.prefecture, 
          PrefectureInfo.title, 
          PrefectureInfo.description, 
          PrefectureImage.referenceLink, PrefectureImage.referenceName FROM PrefectureInfo_spellfix 
        LEFT OUTER JOIN PrefectureInfo ON 
          PrefectureInfo_spellfix.word = PrefectureInfo.Prefecture 
          ${region ? ` AND PrefectureInfo.region = '${region}'` : ""}
        LEFT OUTER JOIN PrefectureImage ON 
          PrefectureImage.id = (
            SELECT 
              MIN(id) 
            FROM PrefectureImage 
            WHERE 
              PrefectureImage.prefecture = PrefectureInfo.prefecture
          )
        WHERE 
          word MATCH '*${text}*' AND 
          word != 'All' AND 
          TOP = 10000
          ${region ? ` AND PrefectureInfo.region = '${region}'` : ""}`,
    };
  } else {
    query = {
      // spotZ: `SELECT * FROM (SELECT SpotInfo.prefecture, SpotInfo.city, SpotInfo.spot, SpotInfo.title, SpotInfo.description, CityInfo.region FROM SpotInfo JOIN CityInfo ON CityInfo.city = SpotInfo.city WHERE SpotInfo.prefecture = '${prefecture}' AND SpotInfo.city = '${city?.replace(
      //   "'",
      //   "''"
      // )}' AND CityInfo.region = '${region}') AS SpotInfo JOIN SpotImage ON SpotImage.id = (SELECT MIN(id) FROM SpotImage WHERE SpotImage.spot = SpotInfo.spot)`,
      // spotX: `SELECT * FROM (SELECT SpotInfo.prefecture, SpotInfo.city, SpotInfo.spot, SpotInfo.title, SpotInfo.description, CityInfo.region FROM (SELECT prefecture, city, spot, title, description FROM SpotInfo WHERE prefecture = '${prefecture}' AND city = '${city?.replace(
      //   "'",
      //   "''"
      // )}') AS SpotInfo JOIN CityInfo ON CityInfo.city = SpotInfo.city WHERE CityInfo.region = '${region}') AS SpotInfo JOIN SpotImage ON SpotImage.id = (SELECT MIN(id) FROM SpotImage WHERE SpotImage.spot = SpotInfo.spot)`,
      spot: `
        SELECT 
          * 
        FROM (
          SELECT 
            SpotInfo.id AS infoId,
            CityInfo.region AS region, 
            SpotInfo.city AS city, 
            SpotInfo.prefecture AS prefecture, 
            SpotInfo.spot AS spot, 
            SpotInfo.title as title, 
            SpotInfo.description AS description, 
            SpotInfo.priceLevel AS priceLevel
          FROM SpotInfo 
        INNER JOIN CityInfo ON 
          CityInfo.city = SpotInfo.city AND 
          CityInfo.prefecture = SpotInfo.prefecture 
        WHERE 
          CityInfo.region = '${region}' AND 
          SpotInfo.prefecture = '${prefecture}' AND 
          SpotInfo.city = '${city?.replace("'", "''")}') 
        AS SpotInfo 
        JOIN SpotImage ON 
          SpotImage.id = (
            SELECT 
              MIN(id) 
            FROM 
              SpotImage 
            WHERE 
              SpotImage.spot = SpotInfo.spot
          )`,
      city: `
        SELECT
          CityInfo.id AS infoId,
          CityInfo.region, 
          CityInfo.city, 
          CityInfo.prefecture, 
          CityInfo.title, 
          CityInfo.description, 
          CityImage.referenceLink, 
          CityImage.referenceName 
        FROM 
          CityInfo 
        INNER JOIN CityImage ON 
          CityImage.id = (
            SELECT 
              MIN(id) 
            FROM 
              CityImage 
            WHERE 
              CityImage.city = CityInfo.city AND 
              CityImage.prefecture = CityInfo.prefecture
          )
        WHERE 
          CityInfo.region = '${region}'
          ${prefecture ? `AND CityInfo.prefecture = '${prefecture}'` : ""}`,
      prefecture: `
        SELECT
          PrefectureInfo.id AS infoId,
          PrefectureInfo.region, 
          PrefectureInfo.prefecture, 
          PrefectureInfo.title, 
          PrefectureInfo.description, 
          PrefectureImage.referenceLink, 
          PrefectureImage.referenceName 
        FROM 
          PrefectureInfo 
        INNER JOIN PrefectureImage ON 
          PrefectureImage.id = (
            SELECT 
              MIN(id) 
            FROM 
              PrefectureImage 
            WHERE 
              PrefectureImage.prefecture = PrefectureInfo.prefecture
          )
        WHERE 
          PrefectureInfo.prefecture != 'All'
          ${region ? ` AND PrefectureInfo.region = '${region}'` : ""}`,
    };
  }

  let places = await instance.raw(
    `${query[type]}${` LIMIT ${limit} OFFSET ${(page - 1) * limit};`}`
  );

  places = places.map((place) => {
    const imageUrl = {
      region: `https://jp-travel.s3.amazonaws.com/1/preview/prefecture/${place.region}_All_1.webp`,
      prefecture: `https://jp-travel.s3.amazonaws.com/1/preview/prefecture/${place.region}_${place.prefecture}_1.webp`,
      city: `https://jp-travel.s3.amazonaws.com/1/preview/city/${place.prefecture}_${place.city}_1.webp`,
      spot: `https://jp-travel.s3.amazonaws.com/1/preview/spot/${place.city}_${place.spot}_1.webp`,
    };
    return { ...place, imageUrl: imageUrl[type] };
  });

  places = places.map((place) => {
    const articleUrl = {
      region: `/article/${place.region}/`,
      prefecture: `/article/${place.region}/${place.prefecture}/`,
      city: `/article/${place.region}/${place.prefecture}/${place.city}/`,
      spot: `/article/${place.region}/${place.prefecture}/${place.city}/${place.spot}/`,
    };
    return { ...place, articleUrl: articleUrl[type] };
  });

  if (locale !== "en-US") {
    if (!text) {
      const placesId = places.map((place) => {
        return `${place[type]}-${place.infoId}${
          type === "prefecture" || type === "region" ? "" : `-${type}`
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
              `${place[type]}-${place.infoId}${
                type === "prefecture" || type === "region" ? "" : `-${type}`
              }`
          ),
        };
      });
    }
  }
  const countQuery = getCountQuery(query[type], text, type);
  const total = (await instance.raw(countQuery))?.[0]?.total;
  const totalPage = Math.ceil(total / limit);

  places = places.map((place) => ({ ...place, place: place[type] }));
  return {
    places,
    totalPage,
  };
};

function getCountQuery(query, text, type) {
  if (!text) {
    switch (type) {
      case "spot":
        return query.replace("SELECT", `SELECT COUNT(SpotInfo.spot) AS total,`);
      case "city":
        return query.replace("SELECT", `SELECT COUNT(CityInfo.city) AS total,`);
      case "prefecture":
        return query.replace(
          "SELECT",
          `SELECT COUNT(PrefectureInfo.prefecture) AS total,`
        );
    }
  } else {
    switch (type) {
      case "spot":
        return query.replace(
          "SELECT DISTINCT",
          `SELECT COUNT(DISTINCT SpotInfo_spellfix.word) AS total,`
        );
      case "city":
        return query.replace(
          "SELECT DISTINCT",
          `SELECT COUNT(DISTINCT CityInfo_spellfix.word) AS total,`
        );
      case "prefecture":
        return query.replace(
          "SELECT DISTINCT",
          `SELECT COUNT(DISTINCT PrefectureInfo_spellfix.word) AS total,`
        );
    }
  }
}
