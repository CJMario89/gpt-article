import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getArticle } from "service/backend-query";

const useGetArticle = ({ type, country, city }) => {
  const { locale } = useRouter();
  return useQuery({
    queryKey: ["get-article", type, country, city],
    queryFn: async () => {
      const response = await getArticle({ type, country, city, locale });
      return response.json();
    },
  });
};

export default useGetArticle;
