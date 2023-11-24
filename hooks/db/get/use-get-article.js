import { useQuery } from "@tanstack/react-query";
import { getArticle } from "service/backend-query";

const useGetArticle = ({ type, country, city }) => {
  return useQuery({
    queryKey: ["get-article", type, country, city],
    queryFn: async () => {
      const response = await getArticle({ type, country, city });
      return response.json();
    },
  });
};

export default useGetArticle;
