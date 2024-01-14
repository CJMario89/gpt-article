import { useInfiniteQuery } from "@tanstack/react-query";
import { getPlacesByParams } from "service/backend-query";

const useGetPlacesByParams = (
  { type, city, prefecture, region, limit },
  options
) => {
  return useInfiniteQuery({
    queryKey: ["get-places-by-params", type, region, prefecture, city],
    queryFn: async ({ pageParam }) => {
      const isSpot = type === "spot";
      const result = await getPlacesByParams({
        type,
        ...(region ? { region } : { prefecture }),
        ...(isSpot ? { city } : {}),
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
