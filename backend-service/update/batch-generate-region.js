import { articleInstance } from "backend-service/common";
import { prisma } from "backend-service/common";
import { requestGpt } from "backend-service/generate";
import { getRegionalPromptText } from "utils/gpt-prompt-text";

const requestCitiesNumber = 100;
export const batchGenerateRegion = async () => {
  const emptyRegionCities = await prisma.cityArticle.findMany({
    where: { region: "" },
    select: {
      city: true,
    },
  });

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

export async function generateRegion(city) {
  const response = await requestGpt({
    text: getRegionalPromptText({ place: city }),
  });
  const json = JSON.parse(response);
  const region = json.region;
  await articleInstance({ type: "city" }).update({
    where: {
      city,
    },
    data: {
      region,
    },
  });
}
