import { instance } from "backend-service/common";
export const search = async ({
  type,
  text,
  region,
  prefecture,
  city,
  limit,
  page,
}) => {
  let query;
  console.log(type, "type");
  if (text) {
    query = {
      spot: `SELECT DISTINCT word as spot, CityInfo.region, SpotInfo.prefecture, SpotInfo.city, SpotInfo.title, SpotInfo.description from SpotInfo_spellfix 
      LEFT OUTER JOIN SpotInfo ON SpotInfo_spellfix.word = SpotInfo.spot 
      LEFT OUTER JOIN CityInfo ON SpotInfo.city = CityInfo.city AND SpotInfo.prefecture = CityInfo.prefecture
      WHERE word MATCH '*${text}*' AND TOP=10000${
        region ? ` AND CityInfo.region = '${region}'` : ""
      }${prefecture ? ` AND SpotInfo.prefecture = '${prefecture}'` : ""}${
        city ? ` AND SpotInfo.city = '${city?.replace("'", "''")}'` : ""
      }`,
      city: `SELECT DISTINCT word as city, CityInfo.prefecture, CityInfo.title, CityInfo.description, CityImage.referenceLink, CityImage.referenceName FROM CityInfo_spellfix 
  LEFT OUTER JOIN CityInfo ON CityInfo_spellfix.word = CityInfo.city ${
    region ? ` AND CityInfo.region = '${region}'` : ""
  }
  ${prefecture ? ` AND CityInfo.prefecture = '${prefecture}'` : ""}
  LEFT OUTER JOIN CityImage ON CityImage.id = (SELECT MIN(id) FROM CityImage WHERE CityImage.city = CityInfo.city AND CityImage.prefecture = CityInfo.prefecture)
WHERE word MATCH '*${text}*' AND TOP=10000${
        region ? ` AND CityInfo.region = '${region}'` : ""
      }`,
      prefecture: `SELECT DISTINCT word as prefecture, PrefectureInfo.region, PrefectureInfo.prefecture, PrefectureInfo.title, PrefectureInfo.description, PrefectureImage.referenceLink, PrefectureImage.referenceName FROM PrefectureInfo_spellfix 
      LEFT OUTER JOIN PrefectureInfo ON PrefectureInfo_spellfix.word = PrefectureInfo.Prefecture ${
        region ? ` AND PrefectureInfo.region = '${region}'` : ""
      }
      LEFT OUTER JOIN PrefectureImage ON PrefectureImage.id = (SELECT MIN(id) FROM PrefectureImage WHERE PrefectureImage.prefecture = PrefectureInfo.prefecture)
    WHERE word MATCH '*${text}*' AND word != 'All' AND TOP=10000${
        region ? ` AND PrefectureInfo.region = '${region}'` : ""
      }`,
    };
  } else {
    query = {
      spot: `SELECT CityInfo.region, SpotInfo.city, SpotInfo.prefecture, SpotInfo.spot, SpotInfo.title, SpotInfo.description, SpotImage.referenceLink, SpotImage.referenceName FROM SpotInfo 
      INNER JOIN SpotImage ON SpotImage.id = (SELECT MIN(id) FROM SpotImage WHERE SpotImage.spot = SpotInfo.spot)
      INNER JOIN CityInfo ON CityInfo.city = SpotInfo.city AND CityInfo.prefecture = SpotInfo.prefecture 
    WHERE CityInfo.region = '${region}' AND SpotInfo.prefecture = '${prefecture}' AND SpotInfo.city = '${city?.replace(
        "'",
        "''"
      )}'`,
      city: `SELECT CityInfo.region, CityInfo.city, CityInfo.prefecture, CityInfo.title, CityInfo.description, CityImage.referenceLink, CityImage.referenceName FROM CityInfo 
    INNER JOIN CityImage ON CityImage.id = (SELECT MIN(id) FROM CityImage WHERE CityImage.city = CityInfo.city AND CityImage.prefecture = CityInfo.prefecture)
  WHERE CityInfo.region = '${region}'${
        prefecture ? `AND CityInfo.prefecture = '${prefecture}'` : ""
      }`,
      prefecture: `SELECT PrefectureInfo.region, PrefectureInfo.prefecture, PrefectureInfo.title, PrefectureInfo.description, PrefectureImage.referenceLink, PrefectureImage.referenceName FROM PrefectureInfo 
    INNER JOIN PrefectureImage ON PrefectureImage.id = (SELECT MIN(id) FROM PrefectureImage WHERE PrefectureImage.prefecture = PrefectureInfo.prefecture)
  WHERE PrefectureInfo.prefecture != 'All'${
    region ? ` AND PrefectureInfo.region = '${region}'` : ""
  }`,
    };
  }
  console.log(
    `${query[type]}${` LIMIT ${limit} OFFSET ${(page - 1) * limit};`}`
  );
  const places = await instance.raw(
    `${query[type]}${` LIMIT ${limit} OFFSET ${(page - 1) * limit};`}`
  );
  const countQuery = getCountQuery(query[type], text, type);
  const total = (await instance.raw(countQuery))?.[0]?.total;
  const totalPage = Math.ceil(total / limit);
  console.log(places);
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
