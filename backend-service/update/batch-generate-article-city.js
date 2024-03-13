import { requestGpt } from "backend-service/generate";
import { processArticle } from "utils/article";
import { getCityArticlePromptText } from "utils/gpt-prompt-text";
import { updateArticle } from "./article";
import { infoInstance, waitFor429 } from "backend-service/common";
import { getSpots } from "backend-service/get";

export const batchGenerateArticleCity = async () => {
  const cities = await infoInstance({ type: "city" }).where({ content: null });
  console.log(cities.length);
  for (let i = 0; i < cities.length; i++) {
    const { prefecture, city } = cities[i];
    try {
      generateCityInfo({
        prefecture,
        city,
      });
    } catch {}
    if (i % 50 === 49) {
      console.log(`${i + " / " + cities.length}, await 60 secs`);
      await waitFor429(60000);
    }
  }

  return;
};

async function generateCityInfo({ prefecture, city }) {
  const type = "city";
  const spots = await getSpots({ prefecture, city });
  const CityInfoText = getCityArticlePromptText({
    city,
    spots,
  });
  // console.log("requestGpt article", spot);
  console.log(spots);
  console.log(CityInfoText);
  const articleRaw = await requestGpt({
    text: CityInfoText,
  });
  const article = processArticle(articleRaw);
  console.log(type);
  // console.log(article);
  await updateArticle({ type, prefecture, city, article });
}
