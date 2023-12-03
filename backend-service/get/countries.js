import { articleInstance } from "backend-service/common";

export const getCountries = async () => {
  const countries = await articleInstance({ type: "city" })
    .groupBy("country")
    .select("country");
  return countries;
};
