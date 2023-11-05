import { useMutation } from "@tanstack/react-query";
import { postPhoto } from "service/backend-query";

const usePostPhoto = ({ type }, option) => {
  return useMutation(
    async ({ country, city, spot, url, referenceLink, referenceName }) => {
      const result = await postPhoto({
        type,
        country,
        city,
        spot,
        url,
        referenceLink,
        referenceName,
      });
      return result.json();
    },
    { ...option }
  );
};

export default usePostPhoto;
