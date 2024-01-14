import { getRestuarantInfo } from "backend-service/generate";
import { infoInstance } from "backend-service/common";

const requestCitiesNumber = 1000;
export const batchGenerateRestuarant = async () => {
  const existedCities = await infoInstance({ type: "city" });
  const requestCities =
    existedCities.length < requestCitiesNumber
      ? existedCities
      : existedCities.slice(0, requestCitiesNumber);
  for (let i = 0; i < requestCities.length; i++) {
    console.log(`Request ${i}th: ${requestCities[i].cityJapanese}`);
    try {
      await getRestuarantInfo({ place: requestCities[i] });
    } catch (e) {
      console.log(e);
    }
  }
  return;
};
