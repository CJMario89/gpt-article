import { useQuery } from "@tanstack/react-query";
import { getPlacesByParams } from "service/backend-query";

const useGetPlacesByParams = ({ type, country, city, status }, options) => {
  return useQuery(
    ["get-places-by-params", type, country, city, status],
    async () => {
      const result = await getPlacesByParams({
        type,
        country,
        ...(city ? { city } : {}),
        ...(status ? { status } : {}),
      });
      return result.json();
    },
    { ...options }
  );
};

export default useGetPlacesByParams;
