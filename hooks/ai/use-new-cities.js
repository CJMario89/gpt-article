import { gptQuery } from "../../service/ai-query";
import { useMutation } from "@tanstack/react-query";
import { getCities } from "../../service/db-query";

const mutationFn = async ({ country }) => {
  const data = await (await getCities({ country })).json();
  const cities = data.map(({ city }) => city);
  const text = `Please list three resort cities of ${country} with following rules:
1. return in an array (JS array with [] and double quotes)
2. without any other text
3. not in ${cities}`;
  try {
    const result = await gptQuery(text);
    const rawData = (await result.json()).trim();
    console.log(rawData);
    return JSON.parse(rawData);
  } catch (e) {
    console.log(e);
  }
};

const useNewCities = (options) => {
  return useMutation({
    mutationFn,
    mutationKey: ["new-cities"],
    ...options,
  });
};

export default useNewCities;
