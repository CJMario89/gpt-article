import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const updateArticle = async (req, res) => {
  try {
    const { country, city, article } = JSON.parse(req.body);
    const { title, description, content } = article;
    await prisma.article.update({
      where: {
        country,
        city,
      },
      data: {
        title,
        description,
        content,
      },
    });
    await res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default updateArticle;
