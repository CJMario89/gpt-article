import { useQuery } from "@tanstack/react-query";
import { getAllPlaces } from "service/backend-query";

const useGetAllPlaces = ({ type }, options) => {
  return useQuery(
    ["get-all-places", type],
    async () => {
      const result = await getAllPlaces({ type });
      return result.json();
    },
    { ...options }
  );
};

export default useGetAllPlaces;
