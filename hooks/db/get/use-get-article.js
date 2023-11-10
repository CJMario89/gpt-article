import { useQuery } from "@tanstack/react-query";
import { getArticle } from "service/backend-query";

const useGetArticle = ({ type, country, city, status }) => {
  return useQuery({
    queryKey: ["get-article", type, country, city, status],
    queryFn: async () => {
      const response = await getArticle({ type, country, city, status });
      return response.json();
    },
  });
};

export default useGetArticle;
