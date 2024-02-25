import { instance } from "backend-service/common";

export const updateArticle = async ({
  type,
  prefecture,
  city,
  spot,
  article,
}) => {
  const { title, description, content } = article;
  const isSpot = type === "spot";
  const data = [
    prefecture,
    city,
    ...(isSpot ? [spot] : []),
    title,
    description,
    content,
  ];
  if (isSpot) {
    await instance.raw(
      `INSERT INTO SpotInfo(prefecture, city, spot, title, description, content) VALUES(${data
        // eslint-disable-next-line no-unused-vars
        ?.map((_) => "?")
        .join(
          ","
        )}) ON CONFLICT(spot) DO UPDATE SET title = excluded.title, description = excluded.description, content = excluded.content`,
      data
    );
  } else {
    await instance.raw(
      `INSERT INTO CityInfo(prefecture, city, title, description, content) VALUES (${data
        // eslint-disable-next-line no-unused-vars
        ?.map((_) => "?")
        .join(
          ","
        )}) ON CONFLICT(prefecture, city) DO UPDATE SET content = excluded.content`,
      data
    );
  }
};
