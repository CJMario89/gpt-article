import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCountries = async () => {
  const countries = await prisma.article.groupBy({
    by: ["country"],
    select: {
      country: true,
    },
  });
  return countries;
};

const GetCountries = async (req, res) => {
  try {
    const countries = await getCountries();
    return res.status(200).json(countries);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default GetCountries;
