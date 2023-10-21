import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

export const getArticle = async ({ country, city }) => {
  const countries = await prisma.article.findUnique({
    where: {
      country,
      city,
    },
  });
  return countries;
};

const GetArticle = async (req, res) => {
  try {
    const { country, city } = req.query;
    const article = await getArticle({ country, city });
    return res.status(200).json(article);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default GetArticle;
