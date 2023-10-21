import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCities = async ({ country }) => {
  const cities = await prisma.article.findMany({
    where: !!country
      ? {
          country,
        }
      : {},
    select: {
      country: true,
      city: true,
      status: true,
    },
  });
  return cities;
};

const GetCities = async (req, res) => {
  try {
    const { country } = req.query;
    const cities = await getCities({ country });
    res.status(200).json(cities);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default GetCities;
