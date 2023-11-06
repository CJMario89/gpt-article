//five cities and spots
//articles and photo

import { requestGpt, requestStoreGooglePhoto } from "backend-service/generate";
import { getPlacesByParams } from "backend-service/get";
import {
  getArticlePromptText,
  getCitiesPromptText,
  getSpotsPromptText,
} from "utils/gpt-prompt-text";
import { updatePhoto } from "./photo";
import { processArticle } from "utils/article";
import { updateArticle } from "./article";
import { JSDOM } from "jsdom";

export const batchGenerate = async ({ country }) => {
  const existCities = (await getPlacesByParams({ type: "city", country })).map(
    ({ city }) => city
  );

  const citiesText = getCitiesPromptText({ country, cities: existCities });
  const generateCitiesRaw = await requestGpt({ text: citiesText });

  const generateCities = JSON.parse(generateCitiesRaw.trim()).map((place) => {
    return place.replace(/ /g, "-");
  });

  generateCities.forEach(async (city) => {
    const type = "city";
    const cityArticleText = getArticlePromptText({ place: city });
    console.log("requestGpt article", city);
    const articleRaw = await requestGpt({ text: cityArticleText });
    const article = processArticle(articleRaw);
    await updateArticle({ type, country, city, article });
    const cityPhotoReference = await requestStoreGooglePhoto({
      type,
      country,
      city,
    });
    await updatePhoto({
      type,
      country,
      city,
      url: cityPhotoReference.url,
      ...parseReference(cityPhotoReference.referenceLink),
    });

    //spot
    const existSpots = (
      await getPlacesByParams({ type: "spot", country, city })
    ).map(({ spot }) => spot);

    const spotsText = getSpotsPromptText({ city, spots: existSpots });
    console.log("requestGpt spots", city);
    const generateSpotsRaw = await requestGpt({ text: spotsText });
    const generateSpots = JSON.parse(generateSpotsRaw.trim()).map((place) => {
      return place.replace(/ /g, "-");
    });
    generateSpots.map(async (spot) => {
      const type = "spot";
      const spotArticleText = getArticlePromptText({ place: spot });
      console.log("requestGpt article", spot);
      const articleRaw = await requestGpt({ text: spotArticleText });
      const article = processArticle(articleRaw);
      await updateArticle({ type, country, city, article, spot });
      const spotPhotoReference = await requestStoreGooglePhoto({
        type,
        country,
        city,
        spot,
      });
      await updatePhoto({
        type,
        country,
        city,
        spot,
        url: spotPhotoReference.url,
        ...parseReference(spotPhotoReference.referenceLink),
      });
    });
  });
};

function parseReference(link) {
  const dom = new JSDOM(link);
  const node = dom.window.document.querySelector("a");
  return {
    referenceLink: node.href,
    referenceName: node.innerHTML,
  };
}
