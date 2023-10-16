import { sql } from "@vercel/postgres";

export const getCountries = async () => {
  const { rows } = await sql`SELECT country from article GROUP BY country;`;
  return rows;
};

const GetCountries = async (req, res) => {
  try {
    const rows = await getCountries();
    return res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
};

export default GetCountries;
