import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCityArticle = async (params = {}) => {
  const { country, city } = params;
  const article = await prisma.article.findUnique({
    where: { country, city, status: "1" },
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

const GetCityArticle = async (req, res) => {
  try {
    const { country, city } = req.query;
    const article = await getCityArticle({ country, city });
    res.status(200).json(article);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default GetCityArticle;
