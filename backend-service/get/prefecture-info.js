import { instance } from "backend-service/common";

export const getPrefectureInfo = async ({ region, prefecture }) => {
  const prefectureInfo = await instance("PrefectureInfo")
    .where({ region, prefecture })
    .select(["title", "description", "region", "prefecture"])
    .first();
  return prefectureInfo;
};
