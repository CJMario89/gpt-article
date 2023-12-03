import { articleInstance } from "backend-service/common";
import { requestGpt } from "backend-service/generate";
import { getRegionalPromptText } from "utils/gpt-prompt-text";

const requestCitiesNumber = 100;
export const batchGenerateRegion = async () => {
  const emptyRegionCities = await articleInstance({ type: "city" })
    .where({ region: null })
    .select("city");

  const requestCities =
    emptyRegionCities.length > requestCitiesNumber
      ? emptyRegionCities.slice(0, requestCitiesNumber)
      : emptyRegionCities;

  await Promise.all(
    requestCities.map(async ({ city }) => {
      await generateRegion(city);
      return;
    })
  );
};
//prefecture
export async function generateRegion(city) {
  const response = await requestGpt({
    text: getRegionalPromptText({ place: city }),
  });
  console.log(response);
  const json = JSON.parse(response);
  const region = json.region;
  await articleInstance({ type: "city" }).where({ city }).update({
    region,
  });
}
