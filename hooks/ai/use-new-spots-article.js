import { useMutation } from "@tanstack/react-query";
import { gptQuery } from "service/ai-query";
import { processArticle } from "utils/article";

const mutationFn = async ({ spots }) => {
  try {
    return await Promise.all(
      spots.map(async (spot) => {
        const text = `Please produce a popular traveling article about '${spot}' with following rules:
1. return in markdown form which can be parsed by markdown.js
2. without image
3. without gpt hint commentary`;
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

const useNewSpotsArticle = (options) => {
  return useMutation({
    mutationFn,
    mutationKey: ["new-spots-article"],
    ...options,
  });
};

export default useNewSpotsArticle;
