import { useQuery } from "@tanstack/react-query";
import { getSpots } from "service/backend-query";

const useGetSpots = ({ prefecture, city }) => {
  return useQuery({
    queryKey: ["get-spots", prefecture, city],
    queryFn: async () => {
      const response = await getSpots({ prefecture, city });
      return response.json();
    },
    enabled: !!(prefecture && city),
  });
};

export default useGetSpots;
