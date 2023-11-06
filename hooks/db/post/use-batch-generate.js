import { useMutation } from "@tanstack/react-query";
import { batchGenerate } from "service/backend-query";

const useBatchGenerate = (option) => {
  return useMutation(
    async ({ country }) => {
      const result = await batchGenerate({
        country,
      });
      return result.json();
    },
    { ...option }
  );
};

export default useBatchGenerate;
