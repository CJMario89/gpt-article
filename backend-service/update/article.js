import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const updateArticle = async ({ country, city, article }) => {
  const { title, description, content } = article;
  await prisma.cityArticle.update({
    where: {
      country,
      city,
    },
    data: {
      country,
      city,
      title,
      description,
      content,
    },
  });
};
