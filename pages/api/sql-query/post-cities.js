import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

const postCities = async (req, res) => {
  try {
    const { country, cities } = JSON.parse(req.body);
    const data = [];
    cities.forEach((city) => {
      data.push({
        country,
        city,
        title: "",
        description: "",
        status: "-1",
        content: "",
      });
    });
    console.log(cities);
    console.log(data);

    await prisma.article.createMany({ data });
    res.status(200).json({ status: "success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default postCities;
