import {
  getGoogleInfo,
  requestGpt,
  requestStoreGooglePhoto,
} from "backend-service/generate";
import { getAllPlaces } from "backend-service/get";
import {
  getArticlePromptText,
  getSpotsPromptText,
} from "utils/gpt-prompt-text";
import { processArticle } from "utils/article";
import { updateArticle } from "./article";
import { JSDOM } from "jsdom";
import { japanCities } from "../../japan-cities";

const country = "Japan";
const requestCitiesNumber = 1000;
export const batchGenerateJapan = async () => {
  const existedCities = (await getAllPlaces({ type: "city" })).map(
    (place) => place.city
  );
  const absentCities = japanCities.filter(
    (place) => !existedCities.includes(place.city)
  );
  const requestCities =
    absentCities.length > requestCitiesNumber
      ? absentCities.slice(0, requestCitiesNumber)
      : absentCities;
  for (let i = 0; i < requestCities.length; i++) {
    // await waitFor429(1000);
    console.log(`Request ${i}th: ${requestCities[i].cityJapanese}`);
    try {
      await getGoogleInfo({ place: requestCities[i] });
    } catch (e) {
      console.log(e);
    }
  }
  return;
};

export async function waitFor429(ms) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, ms);
  });
}

async function generateCityInfo(city) {
  //use spots to generate description for seo
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
}

export function parseReference(link) {
  const dom = new JSDOM(link);
  const node = dom.window.document.querySelector("a");
  return {
    reference_link: node.href,
    reference_name: node.innerHTML,
  };
}
