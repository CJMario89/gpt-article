import { useMutation } from "@tanstack/react-query";
import { postArticles } from "service/db-query";
import { requestCityPhotoQuery } from "service/google-query";

const usePostArticles = (options) => {
  return useMutation(
    async ({ country, cities, articles }) => {
      try {
        await Promise.all(
          cities.map((city) => requestCityPhotoQuery({ city }))
        );
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
