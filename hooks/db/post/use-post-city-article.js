import { useMutation } from "@tanstack/react-query";
import { postCityArticle } from "service/backend-query";

const usePostCityArticle = (option) => {
  return useMutation(
    async ({ country, city, article }) => {
      const result = await postCityArticle({ country, city, article });
      return result.json();
    },
    { ...option }
  );
};

export default usePostCityArticle;
