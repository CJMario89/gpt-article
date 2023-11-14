import { useMutation } from "@tanstack/react-query";
import { gptQuery } from "service/ai-query";
import { processArticle } from "utils/article";
import { getArticlePromptText } from "utils/gpt-prompt-text";

const useNewArticles = ({ type }, options) => {
  return useMutation({
    mutationFn: async ({ cities, spots }) => {
      const places = type === "city" ? cities : spots;
      return await Promise.all(
        places.map(async (place) => {
          const { text, tokensIncrease, tokensDecrease } = getArticlePromptText(
            {
              place,
            }
          );
          const result = await gptQuery({
            text,
            tokensIncrease,
            tokensDecrease,
          });
          const article = await result.json();
          console.log(article);

          return processArticle(Array.isArray(article) ? article[0] : article);
        })
      );
    },
    mutationKey: ["new-articles", type],
    ...options,
  });
};

export default useNewArticles;
