import { useMutation } from "@tanstack/react-query";
import { postCityPhoto } from "service/backend-query";

const usePostCityPhoto = (option) => {
  return useMutation(
    async ({ country, city, url, referenceLink, referenceName }) => {
      const result = await postCityPhoto({
        country,
        city,
        url,
        referenceLink,
        referenceName,
      });
      return result.json();
    },
    { ...option }
  );
};

export default usePostCityPhoto;
