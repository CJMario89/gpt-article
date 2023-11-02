import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCityArticle = async (params = {}) => {
  const { country, city } = params;
  const article = await prisma.cityArticle.findUnique({
    where: { country, city, status: 1 },
    select: {
      country: true,
      city: true,
      title: true,
      description: true,
      content: true,
    },
  });
  return article;
};
