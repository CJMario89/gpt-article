import { useMutation } from "@tanstack/react-query";
import { updateArticle } from "service/db-query";

const useUpdateArticle = (option) => {
  return useMutation(
    async ({ country, city, article }) => {
      try {
        const result = await updateArticle({ country, city, article });
        return result.json();
      } catch (e) {
        console.log(e);
      }
    },
    { ...option }
  );
};

export default useUpdateArticle;
