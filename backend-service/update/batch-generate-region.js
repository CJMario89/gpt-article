import { infoInstance } from "backend-service/common";
import { requestGpt } from "backend-service/generate";
import { getRegionalPromptText } from "utils/gpt-prompt-text";

export const batchGenerateRegion = async () => {
  let requestPrefecture;

  while (
    (requestPrefecture = await infoInstance({ type: "city" })
      .where({ region: null })
      .select("prefecture")
      .first())
  ) {
    const prefecture = requestPrefecture.prefecture;
    console.log(prefecture);
    await generateRegion(prefecture);
  }
};
//prefecture
export async function generateRegion(prefecture) {
  const response = await requestGpt({
    text: getRegionalPromptText({ place: prefecture }),
  });
  console.log(response);
  const json = JSON.parse(response);
  const region = json.region;
  await infoInstance({ type: "city" }).where({ prefecture }).update({
    region,
  });
}
