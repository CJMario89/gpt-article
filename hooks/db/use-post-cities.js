import { postCities } from "../../service/db-query";
import { useMutation } from "@tanstack/react-query";

const usePostCities = (options) => {
  return useMutation(
    async ({ country, cities }) => {
      try {
        const result = await postCities({ country, cities });
        return result.json();
      } catch (e) {
        console.log(e);
      }
    },
    { ...options }
  );
};

export default usePostCities;
