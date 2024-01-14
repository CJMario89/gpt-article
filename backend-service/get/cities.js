import { infoInstance } from "backend-service/common";

export const getCities = async ({ prefecture }) => {
  const cities = await infoInstance({ type: "city" })
    .where({ prefecture })
    .select("city");
  return cities.map(({ city }) => city);
};
