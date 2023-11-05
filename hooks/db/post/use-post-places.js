import { useMutation } from "@tanstack/react-query";
import { postPlaces } from "service/backend-query";

const usePostPlaces = ({ type }, options) => {
  return useMutation(
    async ({ country, cities, spots }) => {
      const result = await postPlaces({ type, country, cities, spots });
      return result.json();
    },
    { ...options }
  );
};

export default usePostPlaces;
