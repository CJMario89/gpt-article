import { useMutation } from "@tanstack/react-query";
import { gptQuery } from "service/ai-query";
import { processArticle } from "utils/article";

const mutationFn = async ({ cities }) => {
  try {
    return await Promise.all(
      cities.map(async (city) => {
        const text = `Please produce a popular traveling article about '${city}' with following rules:
                  1. return in markdown form which can be parsed by markdown.js
                  2. without image`;
        console.log(text);
        const result = await gptQuery({ text });
        console.log(result);
        const article = await result.json();
        console.log(article);

        return processArticle(Array.isArray(article) ? article[0] : article);
      })
    );
  } catch (e) {
    console.log(e);
  }
};

const useNewCitiesArticle = (options) => {
  return useMutation({
    mutationFn,
    mutationKey: ["new-cities-article"],
    ...options,
  });
};

export default useNewCitiesArticle;
