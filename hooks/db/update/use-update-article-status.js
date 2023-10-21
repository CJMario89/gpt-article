import { useMutation } from "@tanstack/react-query";
import { updateArticleStatus } from "service/db-query";

const useUpdateArticleStatus = (option) => {
  return useMutation(
    async ({ country, city, status }) => {
      try {
        const result = await updateArticleStatus({ country, city, status });
        return result.json();
      } catch (e) {
        console.log(e);
      }
    },
    { ...option }
  );
};

export default useUpdateArticleStatus;
