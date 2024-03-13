import { requestGpt } from "backend-service/generate";
import { processArticle } from "utils/article";
import { getPrefecturePromptText } from "utils/gpt-prompt-text";
import { instance, waitFor429 } from "backend-service/common";

export const batchGenerateArticlePrefecture = async () => {
  const locations = await instance("PrefectureInfo").select(
    "prefecture",
    "region"
  );
  console.log(locations.length);
  for (let i = 0; i < locations.length; i++) {
    const { prefecture, region } = locations[i];
    try {
      generatePrefectureInfo({
        prefecture,
        region,
      });
    } catch {}
    if (i % 50 === 49) {
      console.log(`${i + " / " + locations.length}, await 60 secs`);
      await waitFor429(60000);
    }
  }

  return;
};

async function generatePrefectureInfo({ prefecture, region }) {
  //All
  const PrefectureInfoText = getPrefecturePromptText({
    prefecture: prefecture === "All" ? region : prefecture,
  });
  // console.log("requestGpt article", spot);
  console.log(PrefectureInfoText);
  const articleRaw = await requestGpt({
    text: PrefectureInfoText,
  });
  const article = processArticle(articleRaw);
  // console.log(article);
  const { content } = article;
  await instance("PrefectureInfo")
    .where({ prefecture, region })
    .update({ content });
}
