import { useMutation } from "@tanstack/react-query";
import { postCities } from "service/backend-query";

const usePostCities = (options) => {
  return useMutation(
    async ({ country, cities }) => {
      const result = await postCities({ country, cities });
      return result.json();
    },
    { ...options }
  );
};

export default usePostCities;
