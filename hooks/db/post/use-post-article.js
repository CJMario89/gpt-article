import { useMutation } from "@tanstack/react-query";
import { postCityArticle } from "service/db-query";
import { requestCityPhotoQuery } from "service/google-query";

const usePostArticle = (option) => {
  return useMutation(
    async ({ country, city, article }) => {
      try {
        await requestCityPhotoQuery({ city });
        const result = await postCityArticle({ country, city, article });
        return result.json();
      } catch (e) {
        console.log(e);
      }
    },
    { ...option }
  );
};

export default usePostArticle;
