import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const postCities = async (req, res) => {
  const now = new Date(Date.now()).toISOString().slice(0, 19).replace("T", " ");
  console.log(now);
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
        // createdAt: now,
        // updatedAt: now,
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
