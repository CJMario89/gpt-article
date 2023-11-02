import { useMutation } from "@tanstack/react-query";
import { gptQuery } from "service/ai-query";

const mutationFn = async ({ city }) => {
  const text = `Please list three places that most people travel in ${city}:
  1.  return in an array (JS array with [] and double quotes, , e.x. ["a", "b", "c"])
  2. without any other text`;
  try {
    const result = await gptQuery({ text });
    const rawData = (await result.json()).trim();
    console.log(rawData);
    return JSON.parse(rawData);
  } catch (e) {
    console.log(e);
  }
};

const useNewSpots = (options) => {
  return useMutation({
    mutationFn,
    mutationKey: ["new-spots"],
    ...options,
  });
};

export default useNewSpots;
