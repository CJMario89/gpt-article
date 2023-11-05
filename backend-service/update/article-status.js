import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateArticleStatus = async ({
  type,
  country,
  city,
  spot,
  status,
}) => {
  if (type === "spot") {
    await prisma.spotArticle.update({
      where: {
        country,
        city,
        spot,
      },
      data: {
        status,
      },
    });
  } else {
    await prisma.cityArticle.update({
      where: {
        country,
        city,
      },
      data: {
        status,
      },
    });
  }
};
