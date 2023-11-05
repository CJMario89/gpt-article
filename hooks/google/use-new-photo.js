import { useMutation } from "@tanstack/react-query";
import { requestStorePhoto } from "service/google-query";

const useNewPhoto = ({ type }, options) => {
  const isCity = type === "city";
  return useMutation({
    mutationFn: async ({ country, city, spot }) => {
      const response = await requestStorePhoto({
        country,
        place: isCity ? city : spot,
      });
      return response.json();
    },
    mutationKey: ["new-photo", type],
    ...options,
  });
};

export default useNewPhoto;
