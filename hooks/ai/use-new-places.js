import { getPlacesByParams } from "service/backend-query";
import { useMutation } from "@tanstack/react-query";
import { gptQuery } from "service/ai-query";

const useNewPlaces = ({ type }, options) => {
  return useMutation({
    mutationFn: async ({ country, city }) => {
      if (type === "spot") {
        const data = await (
          await getPlacesByParams({ type: "spot", country, city })
        ).json();
        const spots = data.map(({ spot }) => spot).join(",");
        console.log(data);
        const text = `Please list three spots that most people travel in ${city} with following rules:
1. return in an array (JS array with square brackets and double quotes, e.x. ["a", "b", "c"])
2. without any other text
${spots.length ? `3. spots not in [${spots}]` : ""}`;
        console.log(text);
        const result = await gptQuery({ text });
        const rawData = (await result.json()).trim();
        console.log(rawData);
        const places = JSON.parse(rawData);
        return places.map((place) => {
          console.log(place);
          return place.replace(/ /g, "-");
        });
      } else {
        const data = await (
          await getPlacesByParams({ type: "city", country })
        ).json();
        const cities = data.map(({ city }) => city).join(",");
        const text = `Please list three resort cities of ${country} with following rules:
1. return in an array (JS array with square brackets and double quotes, e.x. ["a", "b", "c"])
2. without any other text
${cities.length ? `3. cities not in [${cities}]` : ""}`;
        const result = await gptQuery({ text });
        const rawData = (await result.json()).trim();
        console.log(rawData);
        const places = JSON.parse(rawData);
        return places.map((place) => {
          console.log(place);
          return place.replace(/ /g, "-");
        });
      }
    },
    mutationKey: ["new-places", type],
    ...options,
  });
};

export default useNewPlaces;
