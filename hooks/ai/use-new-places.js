import { getPlacesByParams } from "service/backend-query";
import { useMutation } from "@tanstack/react-query";
import { gptQuery } from "service/ai-query";
import { getCitiesPromptText, getSpotsPromptText } from "utils/gpt-prompt-text";

const useNewPlaces = ({ type }, options) => {
  return useMutation({
    mutationFn: async ({ country, city }) => {
      let text = "";
      if (type === "spot") {
        const data = await (
          await getPlacesByParams({ type: "spot", country, city })
        ).json();
        const spots = data.map(({ spot }) => spot).join(",");
        console.log(data);
        text = getSpotsPromptText({ city, spots });
      } else {
        const data = await (
          await getPlacesByParams({ type: "city", country })
        ).json();
        const cities = data.map(({ city }) => city).join(",");
        text = getCitiesPromptText({ country, cities });
      }

      const result = await gptQuery({ text });
      const rawData = (await result.json()).trim();
      console.log(rawData);
      const places = JSON.parse(rawData);
      return places.map((place) => {
        console.log(place);
        return place.replace(/ /g, "-");
      });
    },
    mutationKey: ["new-places", type],
    ...options,
  });
};

export default useNewPlaces;
