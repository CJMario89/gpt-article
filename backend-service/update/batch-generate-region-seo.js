import { infoInstance, instance } from "backend-service/common";
import { requestGpt } from "backend-service/generate";
import { getRegionSeoPromptText } from "utils/gpt-prompt-text";

export const batchGenerateRegionSeo = async () => {
  const locations = await infoInstance({ type: "city" })
    .groupBy("region")
    .select("region");
  console.log(locations);
  await Promise.all(
    locations.map(async ({ region }) => {
      await generateRegionSeo({
        region,
      });
    })
  );

  return;
};
//prefecture
export async function generateRegionSeo({ region }) {
  console.log(getRegionSeoPromptText({ region }));
  const response = await requestGpt({
    text: getRegionSeoPromptText({ region }),
  });
  console.log(response);
  const json = JSON.parse(response);
  const { title, description } = json;
  await instance("PrefectureInfo").insert({
    region,
    prefecture: "All",
    title,
    description,
  });
}
