import { useMutation } from "@tanstack/react-query";
import { postArticle } from "service/backend-query";

const usePostArticle = ({ type }, option) => {
  return useMutation(
    async ({ country, city, spot, article }) => {
      const result = await postArticle({ type, country, city, spot, article });
      return result.json();
    },
    { ...option }
  );
};

export default usePostArticle;
