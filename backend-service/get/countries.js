import { infoInstance } from "backend-service/common";

export const getCountries = async () => {
  const countries = await infoInstance({ type: "city" })
    .groupBy("country")
    .select("country");
  return countries;
};
