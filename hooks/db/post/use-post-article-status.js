import { useMutation } from "@tanstack/react-query";
import { postArticleStatus } from "service/backend-query";

const usePostArticleStatus = ({ type }, option) => {
  return useMutation(
    async ({ country, city, spot, status }) => {
      const result = await postArticleStatus({
        type,
        country,
        city,
        spot,
        status,
      });
      return result.json();
    },
    { ...option }
  );
};

export default usePostArticleStatus;
