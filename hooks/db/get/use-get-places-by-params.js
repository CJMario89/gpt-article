import { useInfiniteQuery } from "@tanstack/react-query";
import { getPlacesByParams } from "service/backend-query";

const useGetPlacesByParams = (
  { type, country, city, region, limit },
  options
) => {
  return useInfiniteQuery({
    queryKey: ["get-places-by-params", type, country, region, city],
    queryFn: async ({ pageParam }) => {
      const result = await getPlacesByParams({
        type,
        country,
        ...(region ? { region } : {}),
        ...(city ? { city } : {}),
        page: pageParam ?? 1,
        limit,
      });
      return result.json();
    },
    ...options,
    refetchOnWindowFocus: false,
  });
};

export default useGetPlacesByParams;
