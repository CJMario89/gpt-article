import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const postArticles = async (req, res) => {
  try {
    const { country, cities, articles } = JSON.parse(req.body);
    console.log(articles[0].replaceAll("'", "''"));
    console.log(cities);
    const data = [];
    await Promise.all(
      cities.map(async (city, i) => {
        return await prisma.article.updateMany({
          where: {
            city,
          },
          data: {
            country,
            city,
            title: "title",
            description: "description",
            status: 0,
            content: articles[i].replaceAll("'", "''"),
          },
        });
      })
    );

    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default postArticles;
