import { articleInstance } from "backend-service/common";

export const updateArticleStatus = async ({
  type,
  country,
  city,
  spot,
  status,
}) => {
  const isSpot = type === "spot";
  await articleInstance({ type }).update({
    where: {
      country,
      city,
      ...(isSpot ? { spot } : {}),
    },
    data: {
      status,
    },
  });
};
