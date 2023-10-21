import { useMutation } from "@tanstack/react-query";
import { postArticles } from "service/db-query";

const usePostArticles = (options) => {
  return useMutation(
    async ({ country, cities, articles }) => {
      try {
        const result = await postArticles({ country, cities, articles });
        return result.json();
      } catch (e) {
        console.log(e);
      }
    },
    { ...options }
  );
};

export default usePostArticles;
