import { dalle2Query } from "../../service/ai-query";
import { useMutation } from "@tanstack/react-query";

const mutationFn = async ({ city }) => {
  const text = "Hakone";
  try {
    console.log("creating");
    const result = await dalle2Query(text);
    console.log(result);
    return JSON.parse(result);
  } catch (e) {
    console.log(e);
  }
};

const useNewCitiesImage = (options) => {
  return useMutation({
    mutationFn,
    mutationKey: ["new-cities-image"],
    ...options,
  });
};

export default useNewCitiesImage;
