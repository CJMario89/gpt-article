import { useMutation } from "@tanstack/react-query";
import { postArticleStatus } from "../../service/db-query";

const usePostArticleStatus = (option) => {
  return useMutation(
    async ({ country, city, status }) => {
      try {
        const result = await postArticleStatus({ country, city, status });
        return result.json();
      } catch (e) {
        console.log(e);
      }
    },
    { ...option }
  );
};

export default usePostArticleStatus;
