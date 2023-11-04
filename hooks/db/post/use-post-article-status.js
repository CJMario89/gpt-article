import { useMutation } from "@tanstack/react-query";
import { postCityArticleStatus } from "service/backend-query";

const usePostArticleStatus = (option) => {
  return useMutation(
    async ({ country, city, status }) => {
      console.log({ country, city, status });
      const result = await postCityArticleStatus({ country, city, status });
      return result.json();
    },
    { ...option }
  );
};

export default usePostArticleStatus;
