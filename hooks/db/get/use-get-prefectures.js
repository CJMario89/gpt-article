import { useQuery } from "@tanstack/react-query";
import { getPrefectures } from "service/backend-query";

const useGetPrefectures = ({ region }) => {
  return useQuery({
    queryKey: ["get-prefectures", region],
    queryFn: async () => {
      const response = await getPrefectures({ region });
      return response.json();
    },
    enabled: region !== "All",
  });
};

export default useGetPrefectures;
