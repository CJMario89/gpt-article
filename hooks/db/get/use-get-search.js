import { useInfiniteQuery } from "@tanstack/react-query";
import { getSearch } from "service/backend-query";

const useGetSearch = (
  { type, text, region, prefecture, city, limit = 10 },
  options
) => {
  return useInfiniteQuery({
    queryKey: ["search", type, region, prefecture, city, text],
    queryFn: async ({ pageParam }) => {
      const response = await getSearch({
        type,
        ...(region && region !== "All" ? { region } : {}),
        ...(prefecture ? { prefecture } : {}),
        ...(city ? { city } : {}),
        ...(text ? { text } : {}),
        page: pageParam ?? 1,
        limit,
      });

      const result = await response.json();
      return result;
    },
    ...options,
    refetchOnWindowFocus: false,
  });
};

export default useGetSearch;
