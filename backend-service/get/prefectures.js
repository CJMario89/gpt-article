import { infoInstance } from "backend-service/common";

export const getPrefectures = async ({ region }) => {
  const prefectures = await infoInstance({ type: "city" })
    .where({ region })
    .groupBy("prefecture")
    .select("prefecture");
  return prefectures.map(({ prefecture }) => prefecture);
};
