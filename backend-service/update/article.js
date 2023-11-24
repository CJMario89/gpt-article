import { articleInstance } from "backend-service/common";

export const updateArticle = async ({
  type,
  country,
  city,
  spot,
  article,
  status,
}) => {
  const { title, description, content } = article;
  const isSpot = type === "spot";
  const data = {
    country,
    city,
    spot,
    title,
    description,
    content,
    status,
  };
  await articleInstance({ type }).upsert({
    where: {
      country,
      city,
      ...(isSpot ? { spot } : {}),
    },
    update: data,
    create: data,
  });
};
