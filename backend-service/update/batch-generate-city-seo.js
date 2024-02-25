import { infoInstance } from "backend-service/common";
import { requestGpt } from "backend-service/generate";
import {
  getCitySeoPromptText,
  getRegionalPromptText,
} from "utils/gpt-prompt-text";

export const batchGenerateCitySeo = async () => {
  const cities = await infoInstance({ type: "city" }).where({ title: null });
  await Promise.all(
    cities.slice(0, 1000).filter(async (city) => {
      console.log(city);
      const spots = await infoInstance({ type: "spot" })
        .where({
          prefecture: city.prefecture,
          city: city.city,
        })
        .select(["spot"]);
      // return spots.length === 0;
      await generateCitySeo({
        city: city.city,
        spots: spots.map(({ spot }) => spot),
      });
      return;
    })
  );
};
//prefecture
export async function generateCitySeo({ city, spots }) {
  console.log(spots);

  console.log(getCitySeoPromptText({ city, spots }));
  const response = await requestGpt({
    text: getCitySeoPromptText({ city, spots }),
  });
  console.log(response);
  const json = JSON.parse(response);
  const { title, description } = json;
  await infoInstance({ type: "city" }).where({ city }).update({
    title,
    description,
  });
}
