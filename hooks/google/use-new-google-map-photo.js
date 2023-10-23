import { useMutation } from "@tanstack/react-query";
import { requestGoogleMapPhotoQuery } from "service/google-query";

const mutationFn = async ({ text }) => {
  const response = await requestGoogleMapPhotoQuery({ text });
  return response.json();
};

const useNewGoogleMapPhoto = (options) => {
  return useMutation({
    mutationFn,
    mutationKey: ["new-google-map-photo"],
    ...options,
  });
};

export default useNewGoogleMapPhoto;
