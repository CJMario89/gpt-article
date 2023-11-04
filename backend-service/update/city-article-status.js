import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateArticleStatus = async ({ country, city, status }) => {
  await prisma.cityArticle.update({
    where: {
      country,
      city,
    },
    data: {
      status,
    },
  });
};
