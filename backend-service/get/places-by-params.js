import { infoInstance, instance } from "backend-service/common";

export const getPlacesByParams = async (params = {}) => {
  const { type, prefecture, city, region, page, limit = 4 } = params;
  const isSpot = type === "spot";
  const query = isSpot
    ? `SELECT SpotInfo.prefecture, SpotInfo.city, SpotInfo.spot, title, description, image, referenceName, referenceLink from SpotInfo
      INNER JOIN SpotImage ON SpotImage.id = (SELECT MIN(id) FROM SpotImage WHERE SpotImage.city = SpotInfo.city AND SpotImage.spot = SpotInfo.spot)
  WHERE SpotInfo.city = '${city}' AND SpotInfo.prefecture = '${prefecture}' LIMIT ${Number(
        limit
      )} OFFSET ${(page - 1) * limit}`
    : `SELECT CityInfo.prefecture, CityInfo.city, title, description, image, referenceName, referenceLink from CityInfo
  INNER JOIN CityImage ON CityImage.id = (SELECT MIN(id) FROM CityImage WHERE CityImage.city = CityInfo.city AND CityImage.prefecture = CityInfo.prefecture) WHERE ${
    region
      ? `CityInfo.region = '${region}'`
      : `CityInfo.prefecture = '${prefecture}'`
  } LIMIT ${Number(limit)} OFFSET ${(page - 1) * limit} `;
  const places = await instance.raw(query);

  // let places;

  // if (isSpot) {
  //   await instance.transaction(async (trx) => {
  //     await Promise.all([
  //       await trx("SpotInfo")
  //         .where({ prefecture, city })
  //         .select("prefecture", "city", "spot")
  //         .offset((page - 1) * limit)
  //         .limit(4),
  //     ]);
  //   });
  // }

  const total = (
    await infoInstance({ type })
      .where({
        ...(region ? { region } : { prefecture }),
        ...(isSpot ? { city } : {}),
      })
      .count(`${type} AS count`)
  )[0].count;

  const totalPage = Math.ceil(total / limit);
  return {
    places,
    totalPage,
  };
};
