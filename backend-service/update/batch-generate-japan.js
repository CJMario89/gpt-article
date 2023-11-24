import { requestGpt, requestStoreGooglePhoto } from "backend-service/generate";
import { getAllPlaces, getSimplePlacesByParams } from "backend-service/get";
import {
  getArticlePromptText,
  getSpotsPromptText,
} from "utils/gpt-prompt-text";
import { processArticle } from "utils/article";
import { updateArticle } from "./article";
import { JSDOM } from "jsdom";
import { japanCities } from "../../japan-cities";
import { generateRegion } from "./batch-generate-region";

const country = "Japan";
const requestCitiesNumber = 30;
export const batchGenerateJapan = async () => {
  const existedCities = (await getAllPlaces({ type: "city" })).map(
    (place) => place.city
  );
  const absentCities = japanCities.filter(
    (city) => !existedCities.includes(city)
  );

  const requestCities =
    absentCities.length > requestCitiesNumber
      ? absentCities.slice(0, requestCitiesNumber)
      : absentCities;
  const cities = await Promise.all(
    requestCities.map(async (city) => {
      const [, generatedSpots] = await Promise.all([
        await generateCityArticle(city),
        await generateSpots(city),
        await generateRegion(city),
      ]);
      console.log(generateSpots);
      await Promise.all(
        generatedSpots.map(async (spot) => {
          await generateSpotArticle(city, spot);
        })
      );
      return city;
    })
  );
  return cities;
};

async function generateCityArticle(city) {
  const type = "city";
  const cityArticleText = getArticlePromptText({ place: city });
  console.log("requestGpt article", city);
  const articleRaw = await requestGpt({ text: cityArticleText });
  const article = processArticle(articleRaw);
  await updateArticle({ type, country, city, article, status: 1 });
  await requestStoreGooglePhoto({
    type,
    country,
    city,
  });
}

async function generateSpots(city) {
  console.log(await getSimplePlacesByParams({ type: "spot", country, city }));
  const existSpots = (
    await getSimplePlacesByParams({ type: "spot", country, city })
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
  return JSON.parse(generateSpotsRaw.trim()).map((place) => {
    return place.replace(/ /g, "-");
  });
}

async function generateSpotArticle(city, spot) {
  const type = "spot";
  const spotArticleText = getArticlePromptText({
    place: spot,
  });
  console.log("requestGpt article", spot);
  const articleRaw = await requestGpt({
    text: spotArticleText,
  });
  const article = processArticle(articleRaw);
  await updateArticle({ type, country, city, article, spot, status: 1 });
  await requestStoreGooglePhoto({
    type,
    country,
    city,
    spot,
  });
}

export function parseReference(link) {
  const dom = new JSDOM(link);
  const node = dom.window.document.querySelector("a");
  return {
    image_reference_link: node.href,
    image_reference_name: node.innerHTML,
  };
}
