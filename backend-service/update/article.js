import { instance } from "backend-service/common";

export const updateArticle = async ({ type, country, city, spot, article }) => {
  const { title, description, content } = article;
  const isSpot = type === "spot";
  const ftsData = [city, ...(isSpot ? [spot] : []), title, description];
  const data = [country, ...ftsData, content];
  if (isSpot) {
    await instance.raw(
      `INSERT INTO SpotArticle(country, city, spot, title, description, content) VALUES(${data
        // eslint-disable-next-line no-unused-vars
        ?.map((_) => "?")
        .join(
          ","
        )}) ON CONFLICT(spot) DO UPDATE SET title = excluded.title, description = excluded.description, content = excluded.content`,
      data
    );
    await instance.raw(
      `INSERT INTO SpotArticle_fts(city, spot, title, description) VALUES(${ftsData
        // eslint-disable-next-line no-unused-vars
        ?.map((_) => "?")
        .join(
          ","
        )}) ON CONFLICT(spot) DO UPDATE SET title = excluded.title, description = excluded.description`,
      ftsData
    );
  } else {
    await instance.raw(
      `INSERT INTO CityArticle(country, city, title, description, content) VALUES (${data
        // eslint-disable-next-line no-unused-vars
        ?.map((_) => "?")
        .join(
          ","
        )}) ON CONFLICT(city) DO UPDATE SET title = excluded.title, description = excluded.description, content = excluded.content`,
      data
    );
    await instance.raw(
      `INSERT INTO CityArticle_fts(city, title, description) VALUES(${ftsData
        // eslint-disable-next-line no-unused-vars
        ?.map((_) => "?")
        .join(
          ","
        )}) ON CONFLICT(city) DO UPDATE SET title = excluded.title, description = excluded.description`,
      ftsData
    );
  }
};
