import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const getCities = async (req, res) => {
  try {
    const { country } = req.query;
    const cities = await prisma.article.findMany({
      where: {
        country,
      },
      select: {
        city: true,
      },
    });
    res.status(200).json(cities);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default getCities;
