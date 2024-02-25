import { instance } from "backend-service/common";
import { getGooglePrefectureInfo } from "backend-service/generate";

export const batchGeneratePrefectureInfo = async () => {
  const locations = await instance("PrefectureInfo").select([
    "region",
    "prefecture",
  ]);
  await Promise.all(
    locations.map(async ({ region, prefecture }) => {
      await getGooglePrefectureInfo({ place: { region, prefecture } });
    })
  );
  return;
};
