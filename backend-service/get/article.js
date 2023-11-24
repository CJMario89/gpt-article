import { articleInstance } from "backend-service/common";

export const getArticle = async (params = {}) => {
  const { type, country, city, spot, status } = params;
  const isSpot = type === "spot";
  return await articleInstance({ type }).findUnique({
    where: {
      country,
      city,
      ...(isSpot ? { spot } : {}),
      ...(status ? { status } : {}),
    },
    select: {
      country: true,
      city: true,
      ...(isSpot ? { spot: true } : {}),
      title: true,
      description: true,
      content: true,
      image: true,
      image_reference_link: true,
      image_reference_name: true,
    },
  });
};
