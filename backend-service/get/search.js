import { instance } from "backend-service/common";
export const search = async ({ type, text }) => {
  console.log(type);
  const places =
    type === "spot"
      ? [
          ...(await instance.raw(
            `SELECT word as spot, SpotArticle.city from SpotArticle_spellfix LEFT OUTER JOIN SpotArticle ON LOWER(SpotArticle_spellfix.word) = LOWER(SpotArticle.spot) WHERE word MATCH '${text}';`
          )),
        ]
      : [
          ...(await instance.raw(
            `SELECT word as city FROM CityArticle_spellfix WHERE word MATCH '${text}'`
          )),
        ];
  console.log(places);
  return places;
};
