import { useQuery } from "@tanstack/react-query";
import { getSearch } from "service/backend-query";

const useGetSearch = ({ type, text }, options) => {
  return useQuery({
    queryKey: ["get-search", type, text],
    queryFn: async () => {
      const result = await getSearch({
        type,
        text,
      });
      return result.json();
    },
    ...options,
    refetchOnWindowFocus: false,
  });
};

export default useGetSearch;
