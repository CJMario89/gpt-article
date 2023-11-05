import { useMutation } from "@tanstack/react-query";
import { gptQuery } from "service/ai-query";
import { processArticle } from "utils/article";

const useNewArticles = ({ type }, options) => {
  const isCity = type === "city";
  return useMutation({
    mutationFn: async ({ cities, spots }) => {
      const places = isCity ? cities : spots;
      return await Promise.all(
        places.map(async (place) => {
          const cityText = `Please produce a popular traveling article about '${place}' with following rules:
1. return in markdown form which can be parsed by markdown.js
2. without image
3. without gpt hint commentary`;

          const spotText = `Please produce a popular traveling article about '${place}' with following rules:
1. return in markdown form which can be parsed by markdown.js
2. without image
3. without gpt hint commentary`;
          console.log(isCity ? cityText : spotText);
          const result = await gptQuery({ text: isCity ? cityText : spotText });
          console.log(result);
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
