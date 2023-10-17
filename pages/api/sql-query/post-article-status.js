import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const postArticleStatus = async (req, res) => {
  try {
    const { country, city, status } = JSON.parse(req.body);
    await prisma.article.update({
      where: {
        country,
        city,
      },
      data: {
        status,
      },
    });
    await res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default postArticleStatus;
