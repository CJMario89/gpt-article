import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { getPlacesWithTranslation } from "service/backend-query";

const useGetPlaceWithTranslation = ({
  region,
  prefecture,
  city,
  ...options
}) => {
  const { locale } = useRouter();
  return useQuery({
    queryKey: ["get-places-with-translation", region, prefecture, city, locale],
    queryFn: async () => {
      const response = await getPlacesWithTranslation({
        ...getQueryParams({ region }),
        ...getQueryParams({ prefecture }),
        ...getQueryParams({ city }),
        locale,
      });
      return response.json();
    },
    ...options,
  });
};

const getQueryParams = (place) => {
  const [key, value] = Object.entries(place)[0];
  return value && value !== "All" ? { [key]: value } : {};
};

export default useGetPlaceWithTranslation;
