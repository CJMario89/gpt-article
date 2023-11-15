import { prisma } from "backend-service/prisma";

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
