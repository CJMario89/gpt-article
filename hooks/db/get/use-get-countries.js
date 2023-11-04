import { useQuery } from "@tanstack/react-query";
import { getCountries } from "service/backend-query";

const useGetCountries = (options) => {
  return useQuery(
    ["get-countries"],
    async () => {
      const result = await getCountries();
      return result.json();
    },
    { ...options }
  );
};

export default useGetCountries;
