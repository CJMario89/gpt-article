import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const postArticles = async (req, res) => {
  try {
    const { country, cities, articles } = JSON.parse(req.body);
    console.log(articles[0].content?.replaceAll("'", "''"));
    console.log(cities);
    const data = [];
    await Promise.all(
      cities.map(async (city, i) => {
        const { title, description, content } = articles[i];
        return await prisma.article.updateMany({
          where: {
            city,
          },
          data: {
            country,
            city,
            title,
            description,
            status: "0",
            content: content.replaceAll("'", "''"),
          },
        });
      })
    );
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
  await prisma.$disconnect();
  console.log("disconnected");
};

export default postArticles;
