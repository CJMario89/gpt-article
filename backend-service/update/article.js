import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const updateArticle = async ({
  type,
  country,
  city,
  spot,
  article,
  status,
}) => {
  const { title, description, content } = article;
  if (type === "spot") {
    const data = {
      country,
      city,
      spot,
      title,
      description,
      content,
      status,
    };
    await prisma.spotArticle.upsert({
      where: {
        country,
        city,
        spot,
      },
      update: data,
      create: data,
    });
  } else {
    const data = {
      country,
      city,
      title,
      description,
      content,
    };
    await prisma.cityArticle.upsert({
      where: {
        country,
        city,
      },
      create: data,
      update: data,
    });
  }
};
