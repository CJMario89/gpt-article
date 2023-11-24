import { useInfiniteQuery } from "@tanstack/react-query";
import { getPlacesByParams } from "service/backend-query";

const useGetPlacesByParams = (
  { type, country, city, region, status, limit },
  options
) => {
  return useInfiniteQuery({
    queryKey: ["get-places-by-params", type, country, region, city, status],
    queryFn: async ({ pageParam }) => {
      const result = await getPlacesByParams({
        type,
        country,
        ...(region ? { region } : {}),
        ...(city ? { city } : {}),
        ...(status ? { status } : {}),
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
