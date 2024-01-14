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
  const isSpot = type === "spot";
  let query;
  if (text) {
    query = isSpot
      ? `SELECT DISTINCT word as spot, CityInfo.region, SpotInfo.prefecture, SpotInfo.city, SpotInfo.title, SpotInfo.description from SpotInfo_spellfix 
            LEFT OUTER JOIN SpotInfo ON SpotInfo_spellfix.word = SpotInfo.spot 
            LEFT OUTER JOIN CityInfo ON SpotInfo.city = CityInfo.city AND SpotInfo.prefecture = CityInfo.prefecture
            WHERE word MATCH '${text}'${
          region ? ` AND CityInfo.region = '${region}'` : ""
        }${prefecture ? ` AND SpotInfo.prefecture = '${prefecture}'` : ""}${
          city ? ` AND SpotInfo.city = '${city}'` : ""
        }`
      : `SELECT DISTINCT word as city, CityInfo.prefecture, CityInfo.title, CityInfo.description, CityImage.referenceLink, CityImage.referenceName FROM CityInfo_spellfix 
              LEFT OUTER JOIN CityInfo ON CityInfo_spellfix.word = CityInfo.city ${
                region ? ` AND CityInfo.region = '${region}'` : ""
              }
              ${prefecture ? ` AND CityInfo.prefecture = '${prefecture}'` : ""}
              LEFT OUTER JOIN CityImage ON CityImage.id = (SELECT MIN(id) FROM CityImage WHERE CityImage.city = CityInfo.city AND CityImage.prefecture = CityInfo.prefecture)
            WHERE word MATCH '${text}'${
          region ? ` AND CityInfo.region = '${region}'` : ""
        }`;
  } else {
    query = isSpot
      ? `SELECT CityInfo.region, SpotInfo.city, SpotInfo.prefecture, SpotInfo.spot, SpotInfo.title, SpotInfo.description, SpotImage.referenceLink, SpotImage.referenceName FROM SpotInfo 
              INNER JOIN SpotImage ON SpotImage.id = (SELECT MIN(id) FROM SpotImage WHERE SpotImage.spot = SpotInfo.spot)
              INNER JOIN CityInfo ON CityInfo.city = SpotInfo.city AND CityInfo.prefecture = SpotInfo.prefecture 
            WHERE CityInfo.region = '${region}' AND SpotInfo.prefecture = '${prefecture}' AND SpotInfo.city = '${city}'`
      : `SELECT CityInfo.region, CityInfo.city, CityInfo.prefecture, CityInfo.title, CityInfo.description, CityImage.referenceLink, CityImage.referenceName FROM CityInfo 
              INNER JOIN CityImage ON CityImage.id = (SELECT MIN(id) FROM CityImage WHERE CityImage.city = CityInfo.city AND CityImage.prefecture = CityInfo.prefecture)
            WHERE CityInfo.region = '${region}'${
          prefecture ? `AND CityInfo.prefecture = '${prefecture}'` : ""
        }`;
  }
  const places = await instance.raw(
    `${query}${` LIMIT ${limit} OFFSET ${(page - 1) * limit};`}`
  );
  const countQuery = getCountQuery(query, text, isSpot);
  const total = (await instance.raw(countQuery))?.[0]?.total;
  const totalPage = Math.ceil(total / limit);
  return {
    places,
    totalPage,
  };
};

function getCountQuery(query, text, isSpot) {
  if (!text) {
    if (isSpot) {
      return query.replace("SELECT", `SELECT COUNT(SpotInfo.spot) AS total,`);
    } else {
      return query.replace("SELECT", `SELECT COUNT(CityInfo.city) AS total,`);
    }
  } else {
    if (isSpot) {
      return query.replace(
        "SELECT DISTINCT",
        `SELECT COUNT(DISTINCT SpotInfo_spellfix.word) AS total,`
      );
    } else {
      return query.replace(
        "SELECT DISTINCT",
        `SELECT COUNT(DISTINCT CityInfo_spellfix.word) AS total,`
      );
    }
  }
}
