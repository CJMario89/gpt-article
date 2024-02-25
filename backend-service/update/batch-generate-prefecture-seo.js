import { infoInstance, instance } from "backend-service/common";
import { requestGpt } from "backend-service/generate";
import { getPrefectureSeoPromptText } from "utils/gpt-prompt-text";

export const batchGeneratePrefectureSeo = async () => {
  const locations = await infoInstance({ type: "city" })
    .groupBy("prefecture")
    .select("prefecture", "region");
  console.log(locations);
  await Promise.all(
    locations.map(async ({ region, prefecture }) => {
      await generatePrefectureSeo({
        region,
        prefecture,
      });
    })
  );

  return;
};
//prefecture
export async function generatePrefectureSeo({ region, prefecture }) {
  console.log(getPrefectureSeoPromptText({ prefecture }));
  const response = await requestGpt({
    text: getPrefectureSeoPromptText({ prefecture }),
  });
  console.log(response);
  const json = JSON.parse(response);
  const { title, description } = json;
  await instance("PrefectureInfo").insert({
    region,
    prefecture,
    title,
    description,
  });
}
