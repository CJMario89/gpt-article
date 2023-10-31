import { useMutation } from "@tanstack/react-query";
import { requestCityPhotoQuery } from "service/google-query";

const mutationFn = async ({ city }) => {
  const response = await requestCityPhotoQuery({ city });
  return response.json();
};

const useNewCityPhoto = (options) => {
  return useMutation({
    mutationFn,
    mutationKey: ["new-city-photo"],
    ...options,
  });
};

export default useNewCityPhoto;
