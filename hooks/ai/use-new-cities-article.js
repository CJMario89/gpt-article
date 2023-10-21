import { useMutation } from "@tanstack/react-query";
import { gptQuery } from "../../service/ai-query";

const mutationFn = async ({ cities }) => {
  try {
    return await Promise.all(
      cities.map(async (city) => {
        const text = `Please produce a popular traveling article about '${city}' with following rules:
                  1. return in markdown form which can be parsed by markdown.js
                  2. without image`;
        console.log(text);
        const result = await gptQuery(text);
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

function processArticle(article) {
  const parseArticle = article.split("\n");
  const title = parseArticle[0].split("#")[1].trim();
  const description =
    parseArticle[1] !== "" ? parseArticle[1].trim() : parseArticle[2].trim();
  const regex = /\*(.*?)\*/g;
  return { content: article.replace(regex, "").trim(), title, description };
}

export default useNewCitiesArticle;
