import { useMutation } from "@tanstack/react-query";
import { gptQuery } from "../../service/ai-query";

const useNewCitiesArticle = ({ options }) => {
  return useMutation(
    async ({ cities }) => {
      try {
        return await Promise.all(
          cities.map(async (city) => {
            const text = `Please produce a popular traveling article about '${city}' with following rules:
                      1. return in markdown form which can be parsed by markdown.js
                      2. without image`;
            console.log(text);
            const result = await gptQuery(text);
            console.log(result);
            return result.json();
          })
        );
      } catch (e) {
        console.log(e);
      }
    },
    { ...options }
  );
};

export default useNewCitiesArticle;
