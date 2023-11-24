import { useMutation } from "@tanstack/react-query";
import { batchGenerateJapan } from "service/backend-query";

const useBatchGenerateJapan = (option) => {
  return useMutation(
    async () => {
      const result = await batchGenerateJapan();
      return result.json();
    },
    { ...option }
  );
};

export default useBatchGenerateJapan;
