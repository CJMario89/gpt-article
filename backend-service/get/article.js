import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getArticle = async (params = {}) => {
  const { type, country, city, spot, status } = params;
  if (type === "spot") {
    return await prisma.spotArticle.findUnique({
      where: { country, city, spot, ...(status ? { status } : {}) },
      select: {
        country: true,
        city: true,
        spot: true,
        title: true,
        description: true,
        content: true,
      },
    });
  } else {
    return await prisma.cityArticle.findUnique({
      where: { country, city, ...(status ? { status } : {}) },
      select: {
        country: true,
        city: true,
        title: true,
        description: true,
        content: true,
      },
    });
  }
};
