import { useMutation } from "@tanstack/react-query";
import { postCityArticle } from "service/db-query";
import { requestCityPhotoQuery } from "service/google-query";

const usePostArticle = (option) => {
  return useMutation(
    async ({ country, city, article }) => {
      await requestCityPhotoQuery({ city });
      const result = await postCityArticle({ country, city, article });
      return result.json();
    },
    { ...option }
  );
};

export default usePostArticle;
