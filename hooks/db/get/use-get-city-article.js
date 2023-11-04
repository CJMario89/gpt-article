import { useQuery } from "@tanstack/react-query";
import { getCityArticle } from "service/backend-query";

const useGetCityArticle = ({ country, city }) => {
  return useQuery({
    queryKey: ["get-city-article", country, city],
    queryFn: async () => {
      const response = await getCityArticle({ country, city, status: 1 });
      return response.json();
    },
  });
};

export default useGetCityArticle;
