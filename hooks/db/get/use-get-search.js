import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearch } from "service/backend-query";

const useGetSearch = ({ type, region, text, limit }, options) => {
  return useInfiniteQuery({
    queryKey: ["get-search", type, region, text],
    queryFn: async () => {
      const result = await getSearch({
        type,
        ...(region ? { region } : {}),
        text,
        limit,
      });
      return result.json();
    },
    ...options,
    refetchOnWindowFocus: false,
  });
};

export default useGetSearch;
