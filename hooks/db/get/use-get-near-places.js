import { useInfiniteQuery } from "@tanstack/react-query";
import { getNearPlaces } from "service/backend-query";
const useGetNearPlaces = ({ type, city, prefecture, spot, limit }, options) => {
  return useInfiniteQuery({
    queryKey: ["get-near-places", type, prefecture, city, spot],
    queryFn: async ({ pageParam }) => {
      const isSpot = type === "spot";
      const result = await getNearPlaces({
        type,
        ...(isSpot ? { prefecture, city } : { city, spot }),
        page: pageParam ?? 1,
        limit,
      });
      return result.json();
    },
    ...options,
    refetchOnWindowFocus: false,
  });
};

export default useGetNearPlaces;
