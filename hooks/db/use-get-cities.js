import { useQuery } from "@tanstack/react-query";
import { getCities } from "../../service/db-query";

const useGetCities = ({ country }, options) => {
  return useQuery(
    ["get-cities", country],
    async () => {
      const result = await getCities({ country });
      return result.json();
    },
    { ...options }
  );
};

export default useGetCities;
