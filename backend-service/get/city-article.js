import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCityArticle = async (params = {}) => {
  const { country, city, status } = params;
  const article = await prisma.cityArticle.findUnique({
    where: { country, city, ...(status ? { status } : {}) },
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
