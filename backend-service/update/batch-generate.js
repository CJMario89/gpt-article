import { requestGpt, requestStoreGooglePhoto } from "backend-service/generate";
import { getPlacesByParams } from "backend-service/get";
import {
  getArticlePromptText,
  getCitiesPromptText,
  getSpotsPromptText,
} from "utils/gpt-prompt-text";
import { processArticle } from "utils/article";
import { updateArticle } from "./article";
import { JSDOM } from "jsdom";

export const batchGenerate = async ({ country }) => {
  const existCities = (await getPlacesByParams({ type: "city", country })).map(
    ({ city }) => city
  );

  const { text, tokensDecrease, tokensIncrease } = getCitiesPromptText({
    country,
    cities: existCities,
  });
  const generateCitiesRaw = await requestGpt({
    text,
    tokensDecrease,
    tokensIncrease,
  });

  const generateCities = JSON.parse(generateCitiesRaw.trim()).map((place) => {
    return place.replace(/ /g, "-");
  });

  generateCities.forEach(async (city) => {
    const type = "city";
    const CityInfoText = getArticlePromptText({ place: city });
    console.log("requestGpt article", city);
    const articleRaw = await requestGpt({ text: CityInfoText });
    const article = processArticle(articleRaw);
    await updateArticle({ type, country, city, article });
    await requestStoreGooglePhoto({
      type,
      country,
      city,
    });
    //spot
    const existSpots = (
      await getPlacesByParams({ type: "spot", country, city })
    ).map(({ spot }) => spot);

    const { text, tokensDecrease, tokensIncrease } = getSpotsPromptText({
      city,
      spots: existSpots,
    });
    console.log("requestGpt spots", city);
    const generateSpotsRaw = await requestGpt({
      text,
      tokensDecrease,
      tokensIncrease,
    });
    const generateSpots = JSON.parse(generateSpotsRaw.trim()).map((place) => {
      return place.replace(/ /g, "-");
    });
    generateSpots.map(async (spot) => {
      const type = "spot";
      const SpotInfoText = getArticlePromptText({
        place: spot,
      });
      console.log("requestGpt article", spot);
      const articleRaw = await requestGpt({
        text: SpotInfoText,
      });
      const article = processArticle(articleRaw);
      await updateArticle({ type, country, city, article, spot });
      await requestStoreGooglePhoto({
        type,
        country,
        city,
        spot,
      });
    });
  });
};

export function parseReference(link) {
  const dom = new JSDOM(link);
  const node = dom.window.document.querySelector("a");
  return {
    image_reference_link: node.href,
    image_reference_name: node.innerHTML,
  };
}
