import { requestGpt } from "backend-service/generate";
import { processArticle } from "utils/article";
import { getArticlePromptText } from "utils/gpt-prompt-text";
import { updateArticle } from "./article";
import { infoInstance, waitFor429 } from "backend-service/common";

export const batchGenerateArticle = async () => {
  const spots = await infoInstance({ type: "spot" }).where({ title: null });
  console.log(spots.length);
  for (let i = 0; i < 1; i++) {
    const { prefecture, city, spot, primaryType, reviews, editorialSummary } =
      spots[i];
    try {
      generateSpotInfo({
        prefecture,
        city,
        spot,
        primaryType,
        reviews,
        editorialSummary,
      });
    } catch {}
    if (i % 50 === 49) {
      console.log(`${i + " / " + spots.length}, await 60 secs`);
      await waitFor429(60000);
    }
  }

  return;
};

async function generateSpotInfo({
  prefecture,
  city,
  spot,
  primaryType,
  reviews,
  editorialSummary,
}) {
  const type = "spot";
  const SpotInfoText = getArticlePromptText({
    place: spot,
    type: primaryType?.replace(/_/g, " "),
    reviews: reviews?.replace(/&/g, "\n"),
    editorialSummary,
  });
  // console.log("requestGpt article", spot);
  console.log(SpotInfoText);
  const articleRaw = await requestGpt({
    text: SpotInfoText,
  });
  const article = processArticle(articleRaw);
  // console.log(article);
  await updateArticle({ type, prefecture, city, article, spot });
}
