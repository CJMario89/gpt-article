import { useQuery } from "@tanstack/react-query";
import { getCities } from "service/backend-query";

const useGetCities = ({ prefecture }) => {
  return useQuery({
    queryKey: ["get-cities", prefecture],
    queryFn: async () => {
      const response = await getCities({ prefecture });
      return response.json();
    },
    enabled: !!prefecture,
  });
};

export default useGetCities;
